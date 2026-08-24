import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import QuotationPdfDocument, { PDF_THEMES } from './utils/QuotationPdf';
import defaultSignature from './assets/signature.png';
import logoUni from './assets/logo-uni.png';
import { numberToWordsIndian } from './utils/numberToWords';

// 10 Requested Preset Items
const PRESET_ITEMS = [
  'Waree Panel Top-con 575/580',
  'Waree Panel Bificial 575/580',
  'Adani Top-con',
  'Adani Bificial',
  'C-channel nut bolt structure',
  'ACDB/DCDB cable',
  'Lightning Arester',
  'Earthing rod',
  'Inverter (POLYCAB)',
  'Inverter (HAWELLS)',
  'Providing and fixing total 3.4 kw of rooftop solar system with waaree module inverter polycab 5kw , GI structure , Hot deep',
  'Other / Custom',
];

const KW_OPTIONS = ['3 KW', '4 KW', '5 KW', '6 KW', '7 KW', '8 KW', '10 KW', ''];

// Helper to determine if KW selector applies (Panels and Inverters)
const isKwApplicable = (itemName = '') => {
  if (!itemName) return false;
  const lower = itemName.toLowerCase();
  return (
    lower.includes('panel') ||
    lower.includes('inverter') ||
    lower.includes('top-con') ||
    lower.includes('bificial') ||
    lower.includes('adani') ||
    lower.includes('waree')
  );
};

// Helper for Auto-GST Breakdown calculation
const calculateGstBreakdown = (totalStr, gstPct = 5) => {
  const rawVal = parseFloat(String(totalStr).replace(/,/g, ''));
  if (isNaN(rawVal) || rawVal <= 0) return null;

  // Direct Tax calculation matching quotation billing (Tax = Total * GST%)
  const taxAmt = Math.round(rawVal * (gstPct / 100));
  const taxable = rawVal - taxAmt;
  const halfTax = Math.round(taxAmt / 2);

  return {
    taxableAmount: taxable.toLocaleString('en-IN'),
    rateAmount: taxable.toLocaleString('en-IN'),
    taxAmountText: taxAmt.toLocaleString('en-IN'),
    cgstText: halfTax.toLocaleString('en-IN'),
    sgstText: halfTax.toLocaleString('en-IN'),
    cgstRate: `${gstPct / 2}%`,
    sgstRate: `${gstPct / 2}%`,
    taxPercentageText: `${gstPct}%`,
    totalWords: numberToWordsIndian(rawVal),
  };
};

// Initial Form Values matching reference quotation & default signature.png
const initialFormValues = {
  theme: 'red',
  companyName: 'G. M. ENTERPRISES',
  addressSubHeader: 'Main Road Nagbhid, Dist. Chandrapur',
  specialistTag: 'Specialist in : Solar Energy Solutions',
  companyMobile: '7798936573',
  companyPan: 'CBAPD7536B',
  companyEmail: 'goyaldamale@gmail.com',
  companyGstin: '27CBAPD7536B1Z3',
  logoUrl: logoUni,

  quotationNo: '24',
  quotationDate: '19/08/2026',
  expiryDate: '30/09/2026',

  customerName: '',
  customerAddress: '',
  customerPinCode: '442605',
  customerMobile: '',
  placeOfSupply: 'Maharashtra',

  shipToSameAsBillTo: true,
  shippingName: '',
  shippingAddress: '',
  shippingPinCode: '',
  shippingMobile: '',

  // 3 Columns: Item Name, KW, Quantity
  items: [
    { name: 'Waree Panel Top-con 575/580', kw: '5 KW', qty: '9' },
    { name: 'Inverter (POLYCAB)', kw: '5 KW', qty: '1' },
    { name: 'C-channel nut bolt structure', kw: '', qty: '1' },
    { name: 'ACDB/DCDB cable', kw: '', qty: '1' },
    { name: 'Lightning Arester', kw: '', qty: '1' },
    { name: 'Earthing rod', kw: '', qty: '3' },
  ],

  gstPercentage: '5',
  rateAmount: '2,94,500',
  taxAmountText: '15,500',
  taxPercentageText: '5%',
  totalAmountText: '3,10,000',
  taxableAmount: '2,94,500',
  cgstText: '7,750',
  sgstText: '7,750',
  cgstRate: '2.5%',
  sgstRate: '2.5%',

  bankDetails: {
    name: 'G. M. Enterprises',
    ifsc: 'SBIN0011424',
    accountNo: '44894782843',
    bank: 'STATE BANK OF INDIA',
    branch: 'NAGBHID',
  },

  terms: [
    'This invoice shows actual price of goods and all particulars are true and correct.',
    'Goods once sold will not be taken back.',
    'All disputes subject to Gadchiroli jurisdiction.',
    'Warranty Will be applicable as per manufacture terms only.',
    '5 Year Maintenance Free',
  ],

  signatureUrl: defaultSignature,
};

// Yup validation schema
const QuotationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  quotationNo: Yup.string().required('Quotation No is required'),
  quotationDate: Yup.string().required('Quotation Date is required'),
  totalAmountText: Yup.string().required('Total Amount is required'),
});

function HomeQuotationPage() {
  const [formData, setFormData] = useState(initialFormValues);
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'form' | 'pdf'
  const [isPendingSync, setIsPendingSync] = useState(false);
  const pendingValuesRef = useRef(null);
  const timerRef = useRef(null);

  // Memoize PDF Document instance so PDFViewer NEVER refreshes unnecessarily
  const memoizedPdfDocument = useMemo(() => {
    return <QuotationPdfDocument data={formData} />;
  }, [formData]);

  // Clean Debounced Sync to update PDF ONLY after user stops typing for 3 seconds
  const triggerDebouncedSync = (latestValues) => {
    pendingValuesRef.current = latestValues;
    setIsPendingSync(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setFormData(pendingValuesRef.current);
      setIsPendingSync(false);
    }, 3000);
  };

  // Instant Manual Sync Button
  const forceSyncNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pendingValuesRef.current) {
      setFormData(pendingValuesRef.current);
    }
    setIsPendingSync(false);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Header Navbar */}
      <header className="bg-red-900 text-white px-6 py-4 shadow-md flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logoUni} alt="Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1 shadow" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">G. M. ENTERPRISES</h1>
            <p className="text-xs text-red-200">Solar Energy Solutions Quotation System</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <div className="bg-red-950/60 p-1 rounded border border-red-700/50 flex text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 rounded transition ${activeTab === 'split' ? 'bg-red-700 font-bold text-white' : 'text-red-200 hover:text-white'}`}
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1 rounded transition ${activeTab === 'form' ? 'bg-red-700 font-bold text-white' : 'text-red-200 hover:text-white'}`}
            >
              Form
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`px-3 py-1 rounded transition ${activeTab === 'pdf' ? 'bg-red-700 font-bold text-white' : 'text-red-200 hover:text-white'}`}
            >
              PDF View
            </button>
          </div>

          <PDFDownloadLink
            document={memoizedPdfDocument}
            fileName={`Quotation_${formData.quotationNo || '24'}.pdf`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-xs font-semibold shadow transition flex items-center gap-1.5"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 max-w-7xl w-full mx-auto">
        <Formik
          initialValues={initialFormValues}
          validationSchema={QuotationSchema}
          onSubmit={(values) => {
            setFormData(values);
            setIsPendingSync(false);
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => {
            // Form input change + Auto GST calculation + Smooth debounced PDF update
            const handleFormChange = (e) => {
              handleChange(e);
              const fieldName = e.target.name;
              const fieldVal = e.target.value;

              const updatedValues = {
                ...values,
                [fieldName]: fieldVal,
              };

              // Auto calculate GST & Taxable breakdown if Total Amount or GST % is changed
              if (fieldName === 'totalAmountText' || fieldName === 'gstPercentage') {
                const totalVal = fieldName === 'totalAmountText' ? fieldVal : values.totalAmountText;
                const gstPct = fieldName === 'gstPercentage' ? parseFloat(fieldVal) || 5 : parseFloat(values.gstPercentage) || 5;

                const computed = calculateGstBreakdown(totalVal, gstPct);
                if (computed) {
                  Object.keys(computed).forEach((k) => {
                    updatedValues[k] = computed[k];
                    setFieldValue(k, computed[k]);
                  });
                }
              }

              triggerDebouncedSync(updatedValues);
            };

            return (
              <Form className="h-full flex flex-col">
                <div className={`grid gap-6 ${activeTab === 'split' ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
                  {/* Form Panel */}
                  {(activeTab === 'split' || activeTab === 'form') && (
                    <div className={`${activeTab === 'split' ? 'lg:col-span-6' : 'col-span-1'} bg-white p-5 rounded-lg shadow-sm border border-slate-200 space-y-6 max-h-[85vh] overflow-y-auto`}>
                      <div className="border-b pb-2 text-red-900 flex flex-wrap justify-between items-center gap-2">
                        <h2 className="text-base font-bold text-slate-800">Quotation Generator Form</h2>
                        <div className="flex items-center gap-2 text-xs">
                          {isPendingSync ? (
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold animate-pulse">
                              Pending PDF Sync...
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                              PDF Synced
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => forceSyncNow()}
                            className="bg-red-800 hover:bg-red-900 text-white px-2.5 py-0.5 rounded text-[11px] font-bold shadow-2xs"
                          >
                            Sync Now ⚡
                          </button>
                        </div>
                      </div>

                      {/* PDF Color Theme Picker */}
                      <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">PDF Color Theme</span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            Selected: {PDF_THEMES[values.theme || 'red']?.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {Object.values(PDF_THEMES).map((th) => {
                            const isSelected = (values.theme || 'red') === th.id;
                            return (
                              <button
                                key={th.id}
                                type="button"
                                onClick={() => {
                                  setFieldValue('theme', th.id);
                                  const updated = { ...values, theme: th.id };
                                  setFormData(updated);
                                  setIsPendingSync(false);
                                }}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border transition ${
                                  isSelected
                                    ? 'ring-2 ring-offset-1 ring-slate-800 border-slate-800 shadow-sm'
                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                }`}
                              >
                                <span
                                  className="w-3.5 h-3.5 rounded-full inline-block border border-black/20"
                                  style={{ backgroundColor: th.primary }}
                                />
                                <span style={{ color: isSelected ? th.primary : '#334155' }}>
                                  {th.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quotation No & Dates */}
                      <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Quotation No</label>
                          <input
                            type="text"
                            name="quotationNo"
                            value={values.quotationNo}
                            onChange={handleFormChange}
                            className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                          />
                          {errors.quotationNo && touched.quotationNo && (
                            <div className="text-red-600 text-[10px]">{errors.quotationNo}</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Quotation Date</label>
                          <input
                            type="text"
                            name="quotationDate"
                            value={values.quotationDate}
                            onChange={handleFormChange}
                            className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={values.expiryDate}
                            onChange={handleFormChange}
                            className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                          />
                        </div>
                      </div>

                      {/* Customer / Billing Details */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-1">Customer Details (BILL TO)</h3>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Name</label>
                          <input
                            type="text"
                            name="customerName"
                            value={values.customerName}
                            onChange={handleFormChange}
                            className="w-full px-2 py-1.5 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
                          <textarea
                            rows={2}
                            name="customerAddress"
                            value={values.customerAddress}
                            onChange={handleFormChange}
                            className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Pin Code</label>
                            <input
                              type="text"
                              name="customerPinCode"
                              value={values.customerPinCode}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile</label>
                            <input
                              type="text"
                              name="customerMobile"
                              value={values.customerMobile}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Place of Supply</label>
                            <input
                              type="text"
                              name="placeOfSupply"
                              value={values.placeOfSupply}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* SOLAR ITEMS LIST (3 COLUMNS: Item Name, KW, Quantity) */}
                      <div className="space-y-3 bg-red-50/40 p-3 rounded border border-red-200">
                        <div className="flex justify-between items-center border-b border-red-200 pb-1.5">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-red-900">Solar Items List</h3>
                          <span className="text-[11px] text-slate-500 font-medium">Item Name | KW | Qty</span>
                        </div>

                        {/* Column Header Bar */}
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 uppercase px-1">
                          <span className="w-5 text-center">#</span>
                          <span className="flex-1">1. Item Name</span>
                          <span className="w-24 text-center">2. KW Range</span>
                          <span className="w-20 text-center">3. Qty</span>
                          <span className="w-6"></span>
                        </div>

                        <FieldArray name="items">
                          {({ push, remove }) => (
                            <div className="space-y-2.5">
                              {values.items.map((item, index) => {
                                const kwNeeded = isKwApplicable(item.name);

                                return (
                                  <div key={index} className="flex items-center gap-2 bg-white p-1.5 rounded border border-slate-200 shadow-2xs">
                                    <span className="text-xs font-bold text-slate-400 w-5 text-center">{index + 1}.</span>

                                    {/* 1. Item Name Selector / Input */}
                                    <div className="flex-1 min-w-0">
                                      <select
                                        name={`items.${index}.name`}
                                        value={PRESET_ITEMS.includes(item.name) ? item.name : 'Other / Custom'}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          const updatedItems = [...values.items];
                                          updatedItems[index].name = val === 'Other / Custom' ? '' : val;
                                          if (!isKwApplicable(val)) {
                                            updatedItems[index].kw = '';
                                          } else if (!updatedItems[index].kw) {
                                            updatedItems[index].kw = '5 KW';
                                          }
                                          setFieldValue('items', updatedItems);
                                          triggerDebouncedSync({ ...values, items: updatedItems });
                                        }}
                                        className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none bg-white font-medium text-slate-800"
                                      >
                                        <option value="" disabled>-- Select Solar Item --</option>
                                        {PRESET_ITEMS.map((preset, pIdx) => (
                                          <option key={pIdx} value={preset}>
                                            {pIdx + 1}. {preset}
                                          </option>
                                        ))}
                                      </select>
                                      {/* Custom text input if custom item */}
                                      {(!PRESET_ITEMS.includes(item.name) || item.name === 'Other / Custom') && (
                                        <input
                                          type="text"
                                          placeholder="Type custom item name..."
                                          name={`items.${index}.name`}
                                          value={item.name}
                                          onChange={(e) => {
                                            const updatedItems = [...values.items];
                                            updatedItems[index].name = e.target.value;
                                            setFieldValue('items', updatedItems);
                                            triggerDebouncedSync({ ...values, items: updatedItems });
                                          }}
                                          className="w-full mt-1 px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none bg-slate-50"
                                        />
                                      )}
                                    </div>

                                    {/* 2. KW Range (Only for Panels & Inverters) */}
                                    <div className="w-24">
                                      <select
                                        name={`items.${index}.kw`}
                                        disabled={!kwNeeded}
                                        value={kwNeeded ? item.kw || '5 KW' : ''}
                                        onChange={(e) => {
                                          const updatedItems = [...values.items];
                                          updatedItems[index].kw = e.target.value;
                                          setFieldValue('items', updatedItems);
                                          triggerDebouncedSync({ ...values, items: updatedItems });
                                        }}
                                        className={`w-full px-1.5 py-1 text-xs border rounded outline-none font-semibold ${
                                          kwNeeded
                                            ? 'bg-white text-red-900 border-red-300 focus:ring-1 focus:ring-red-800'
                                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                        }`}
                                      >
                                        {!kwNeeded && <option value="">(None)</option>}
                                        {KW_OPTIONS.filter((opt) => opt !== '').map((kwOpt, kIdx) => (
                                          <option key={kIdx} value={kwOpt}>
                                            {kwOpt}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    {/* 3. Quantity Input */}
                                    <div className="w-20">
                                      <input
                                        type="text"
                                        placeholder="Qty"
                                        name={`items.${index}.qty`}
                                        value={item.qty || ''}
                                        onChange={(e) => {
                                          const updatedItems = [...values.items];
                                          updatedItems[index].qty = e.target.value;
                                          setFieldValue('items', updatedItems);
                                          triggerDebouncedSync({ ...values, items: updatedItems });
                                        }}
                                        className="w-full px-2 py-1 text-xs border rounded text-center font-bold text-slate-800 focus:ring-1 focus:ring-red-800 outline-none"
                                      />
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        remove(index);
                                        const updatedItems = values.items.filter((_, i) => i !== index);
                                        triggerDebouncedSync({ ...values, items: updatedItems });
                                      }}
                                      className="w-6 text-red-600 hover:text-red-800 font-bold text-sm text-center"
                                      title="Remove item"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                );
                              })}

                              <button
                                type="button"
                                onClick={() => {
                                  const newItem = { name: 'Waree Panel Top-con 575/580', kw: '5 KW', qty: '1' };
                                  push(newItem);
                                  triggerDebouncedSync({ ...values, items: [...values.items, newItem] });
                                }}
                                className="mt-2 text-xs font-bold text-red-900 hover:text-red-950 bg-white border border-red-300 rounded px-3 py-1.5 shadow-2xs transition flex items-center gap-1"
                              >
                                + Add Solar Item Row
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>

                      {/* Amount & Financial Breakdown (With Auto GST Calculation) */}
                      <div className="space-y-3 bg-slate-50 p-3 rounded border border-slate-200">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Financial Breakdown</h3>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Auto GST Calculation Active
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">GST Percentage (%)</label>
                            <select
                              name="gstPercentage"
                              value={values.gstPercentage || '5'}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded font-semibold text-red-900 bg-white outline-none"
                            >
                              <option value="5">5% GST (2.5% CGST + 2.5% SGST)</option>
                              <option value="12">12% GST (6% CGST + 6% SGST)</option>
                              <option value="18">18% GST (9% CGST + 9% SGST)</option>
                              <option value="28">28% GST (14% CGST + 14% SGST)</option>
                              <option value="0">0% (Exempted)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Total Amount (Enter Here)</label>
                            <input
                              type="text"
                              name="totalAmountText"
                              value={values.totalAmountText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs font-bold text-red-900 border border-red-300 rounded bg-red-50 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Taxable / Rate Amount (Auto)</label>
                            <input
                              type="text"
                              name="taxableAmount"
                              value={values.taxableAmount}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Total Tax Amount (Auto)</label>
                            <input
                              type="text"
                              name="taxAmountText"
                              value={values.taxAmountText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">CGST Amount (Auto)</label>
                            <input
                              type="text"
                              name="cgstText"
                              value={values.cgstText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">SGST Amount (Auto)</label>
                            <input
                              type="text"
                              name="sgstText"
                              value={values.sgstText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none bg-slate-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PDF Live Viewer Panel */}
                  {(activeTab === 'split' || activeTab === 'pdf') && (
                    <div className={`${activeTab === 'split' ? 'lg:col-span-6' : 'col-span-1'} bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex flex-col h-[85vh]`}>
                      <div className="flex justify-between items-center pb-2 mb-2 border-b">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Live PDF Format Preview (@react-pdf/renderer)
                        </span>
                        <div className="flex items-center gap-2">
                          {isPendingSync && (
                            <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Pending Sync...
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => forceSyncNow()}
                            className="bg-red-800 text-white px-2 py-0.5 rounded text-[10px] font-bold"
                          >
                            Sync PDF ⚡
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 w-full rounded overflow-hidden border border-slate-300 bg-slate-800">
                        <PDFViewer width="100%" height="100%" className="w-full h-full border-none">
                          {memoizedPdfDocument}
                        </PDFViewer>
                      </div>
                    </div>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeQuotationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
