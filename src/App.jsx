import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import QuotationPdfDocument from './utils/QuotationPdf';
import { numberToWordsIndian } from './utils/numberToWords';

// Default initial values based on G. M. ENTERPRISES quotation reference image
const initialFormValues = {
  companyName: 'G. M. ENTERPRISES',
  addressSubHeader: 'Main Road Nagbhid, Dist. Chandrapur',
  specialistTag: 'Specialist in : Solar Energy Solutions',
  companyMobile: '7798936573',
  companyPan: 'CBAPD7536B',
  companyEmail: 'goyaldamale@gmail.com',
  companyGstin: '27CBAPD7536B1Z3',
  safetyTag: 'Safety First...!',

  quotationNo: '24',
  quotationDate: '19/08/2026',
  expiryDate: '30/09/2026',

  customerName: 'Yamaji Ganpat Undirwade',
  customerAddress: 'Gondwana University,Navegaon Complex ,Gadchiroli',
  customerPinCode: '442605',
  customerMobile: '8329861988',
  placeOfSupply: 'Maharashtra',

  shipToSameAsBillTo: true,
  shippingName: '',
  shippingAddress: '',
  shippingPinCode: '',
  shippingMobile: '',

  items: [
    { name: 'Waaree Panel Top-Con 575/580 - 9 Panel * 25 Year Warranty' },
    { name: 'Polycab 5kw Inverter - 1 * 8 Year Warranty' },
    { name: 'Hot Dip Nut Bolt Structure 5kw - 1 * 10 Year Warranty' },
    { name: 'ACDB/DCDB Havells -1' },
    { name: 'DC Cable Polycab' },
    { name: 'LA -1' },
    { name: 'Earthing Rod -3' },
  ],

  qtyText: '1 SET',
  rateAmount: '2,94,500',
  taxAmountText: '15,500',
  taxPercentageText: '5%',
  totalAmountText: '3,10,000',
  taxableAmount: '2,94,500',
  cgstText: '7,750',
  sgstText: '7,750',
  cgstRate: '2.5%',
  sgstRate: '2.5%',
  currencySymbol: '₹',

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
};

// Yup validation schema
const QuotationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  customerName: Yup.string().required('Customer Name is required'),
  customerAddress: Yup.string().required('Customer Address is required'),
  customerMobile: Yup.string().required('Customer Mobile is required'),
  quotationNo: Yup.string().required('Quotation No is required'),
  quotationDate: Yup.string().required('Quotation Date is required'),
  totalAmountText: Yup.string().required('Total Amount is required'),
});

function HomeQuotationPage() {
  const [formData, setFormData] = useState(initialFormValues);
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'form' | 'pdf'

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <header className="bg-red-900 text-white px-6 py-4 shadow-md flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-wide">G. M. ENTERPRISES</h1>
          <p className="text-xs text-red-200">Quotation Generator & PDF Export System</p>
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
              Edit Form
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`px-3 py-1 rounded transition ${activeTab === 'pdf' ? 'bg-red-700 font-bold text-white' : 'text-red-200 hover:text-white'}`}
            >
              Full PDF
            </button>
          </div>

          <PDFDownloadLink
            document={<QuotationPdfDocument data={formData} />}
            fileName={`Quotation_${formData.quotationNo || '24'}.pdf`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-xs font-semibold shadow transition flex items-center gap-1.5"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : ' Download PDF')}
          </PDFDownloadLink>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 max-w-7xl w-full mx-auto">
        <Formik
          initialValues={initialFormValues}
          validationSchema={QuotationSchema}
          onSubmit={(values) => {
            setFormData(values);
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => {
            // Live sync form state to PDF component
            const handleFormChange = (e) => {
              handleChange(e);
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            };

            return (
              <Form className="h-full flex flex-col">
                <div className={`grid gap-6 ${activeTab === 'split' ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
                  {/* Form Panel */}
                  {(activeTab === 'split' || activeTab === 'form') && (
                    <div className={`${activeTab === 'split' ? 'lg:col-span-5' : 'col-span-1'} bg-white p-5 rounded-lg shadow-sm border border-slate-200 space-y-6 max-h-[85vh] overflow-y-auto`}>
                      <h2 className="text-base font-bold text-slate-800 border-b pb-2 text-red-900 flex justify-between items-center">
                        <span>Quotation Details Form</span>
                        <span className="text-xs font-normal text-slate-500">Live PDF Sync</span>
                      </h2>

                      {/* Quotation Numbers */}
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
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
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

                      {/* Customer Details */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-1">Customer / Billing Information</h3>
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
                            <label className="block text-xs font-semibold text-slate-600 mb-1">PIN Code</label>
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

                      {/* Items Section */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-1">Solar Items List</h3>
                        <FieldArray name="items">
                          {({ push, remove }) => (
                            <div className="space-y-2">
                              {values.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-400 w-4">{index + 1}.</span>
                                  <input
                                    type="text"
                                    name={`items.${index}.name`}
                                    value={item.name}
                                    onChange={(e) => {
                                      handleFormChange(e);
                                      const updatedItems = [...values.items];
                                      updatedItems[index].name = e.target.value;
                                      setFormData((prev) => ({ ...prev, items: updatedItems }));
                                    }}
                                    className="flex-1 px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-red-800 outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      remove(index);
                                      const updatedItems = values.items.filter((_, i) => i !== index);
                                      setFormData((prev) => ({ ...prev, items: updatedItems }));
                                    }}
                                    className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => {
                                  push({ name: '' });
                                  setFormData((prev) => ({
                                    ...prev,
                                    items: [...prev.items, { name: '' }],
                                  }));
                                }}
                                className="mt-1 text-xs font-semibold text-red-800 hover:text-red-900 border border-red-300 rounded px-3 py-1 bg-red-50"
                              >
                                + Add Item Row
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>

                      {/* Amount & Financial Breakdown */}
                      <div className="space-y-3 bg-slate-50 p-3 rounded border border-slate-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Financial Summary</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Rate / Taxable</label>
                            <input
                              type="text"
                              name="taxableAmount"
                              value={values.taxableAmount}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Amount</label>
                            <input
                              type="text"
                              name="taxAmountText"
                              value={values.taxAmountText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">CGST</label>
                            <input
                              type="text"
                              name="cgstText"
                              value={values.cgstText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">SGST</label>
                            <input
                              type="text"
                              name="sgstText"
                              value={values.sgstText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1 text-xs border rounded outline-none"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Total Amount</label>
                            <input
                              type="text"
                              name="totalAmountText"
                              value={values.totalAmountText}
                              onChange={handleFormChange}
                              className="w-full px-2 py-1.5 text-xs font-bold text-red-900 border border-red-300 rounded bg-red-50 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PDF Live Viewer Panel */}
                  {(activeTab === 'split' || activeTab === 'pdf') && (
                    <div className={`${activeTab === 'split' ? 'lg:col-span-7' : 'col-span-1'} bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex flex-col h-[85vh]`}>
                      <div className="flex justify-between items-center pb-2 mb-2 border-b">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Live PDF Format Preview (@react-pdf/renderer)
                        </span>
                        <span className="text-[11px] text-slate-500">A4 Standard Printable Layout</span>
                      </div>
                      <div className="flex-1 w-full rounded overflow-hidden border border-slate-300 bg-slate-800">
                        <PDFViewer width="100%" height="100%" className="w-full h-full border-none">
                          <QuotationPdfDocument data={formData} />
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
