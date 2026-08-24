import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { numberToWordsIndian } from './numberToWords';
import defaultSignature from '../assets/signature.png';
import defaultLogo from '../assets/logo-uni.png';

// 6 Available Professional PDF Color Themes
export const PDF_THEMES = {
  red: {
    id: 'red',
    name: 'Red / Maroon',
    primary: '#800000',
    highlight: '#fce8e6',
  },
  darkBlue: {
    id: 'darkBlue',
    name: 'Dark Blue',
    primary: '#1e3a8a',
    highlight: '#dbeafe',
  },
  skyBlue: {
    id: 'skyBlue',
    name: 'Sky Blue',
    primary: '#0284c7',
    highlight: '#e0f2fe',
  },
  brown: {
    id: 'brown',
    name: 'Classic Brown',
    primary: '#78350f',
    highlight: '#fef3c7',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#065f46',
    highlight: '#d1fae5',
  },
  slate: {
    id: 'slate',
    name: 'Dark Slate Gray',
    primary: '#1e293b',
    highlight: '#f1f5f9',
  },
};

const borderColor = '#cccccc';

const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingBottom: 22,
    paddingHorizontal: 28,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#111111',
    backgroundColor: '#ffffff',
  },

  // Top Page Heading
  topHeadingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  // 1. Header Section
  topHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerLeft: {
    width: '75%',
  },
  companyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  addressSubHeader: {
    fontSize: 9.5,
    color: '#333333',
    marginBottom: 3,
  },
  specialistTag: {
    fontSize: 10.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
    marginBottom: 4,
  },
  companyMetaText: {
    fontSize: 8.5,
    color: '#222222',
    lineHeight: 1.3,
  },
  metaLink: {
    color: '#0056b3',
    textDecoration: 'underline',
  },
  headerRight: {
    width: '23%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  topRightLogo: {
    width: 55,
    height: 55,
    objectFit: 'contain',
  },

  // Double horizontal rule
  thinRedLine: {
    borderBottomWidth: 1,
    marginTop: 4,
    marginBottom: 2,
  },
  thickRedLine: {
    borderBottomWidth: 3,
    marginBottom: 8,
  },

  // 2. Quotation Meta Banner
  bannerContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 2,
  },
  bannerItem: {
    color: '#ffffff',
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },

  // 3. BILL TO / SHIP TO Section
  billShipContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    marginBottom: 8,
  },
  billShipCol: {
    width: '50%',
    padding: 6,
  },
  colDivider: {
    borderLeftWidth: 1,
    borderLeftColor: borderColor,
  },
  boxHeading: {
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 8.5,
    color: '#111111',
    lineHeight: 1.3,
    marginBottom: 1,
  },
  boldInline: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },

  // 4. ITEMS Table Section (Columns: ITEMS | KW | QTY | RATE | TAX | AMOUNT)
  tableContainer: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  thItems: {
    width: '43%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    paddingLeft: 4,
  },
  thKw: {
    width: '12%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    textAlign: 'center',
  },
  thItemQty: {
    width: '10%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    textAlign: 'center',
  },
  thRate: {
    width: '12%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    textAlign: 'center',
  },
  thTax: {
    width: '11%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    textAlign: 'center',
  },
  thAmount: {
    width: '12%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    textAlign: 'right',
    paddingRight: 4,
  },

  // Table Body Rows
  tableBodyRow: {
    flexDirection: 'row',
    minHeight: 140,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  leftItemsBlock: {
    width: '65%', // 43 + 12 + 10 = 65%
    borderRightWidth: 1,
    borderRightColor: borderColor,
  },
  itemRowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3.5,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  colNameText: {
    width: '66.15%', // 43 / 65
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    paddingLeft: 2,
  },
  colKwText: {
    width: '18.46%', // 12 / 65
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    textAlign: 'center',
  },
  colQtyText: {
    width: '15.39%', // 10 / 65
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    textAlign: 'center',
  },

  // Right Columns
  tdRateCol: {
    width: '12%',
    paddingTop: 40,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    borderRightWidth: 1,
    borderRightColor: borderColor,
  },
  tdTaxCol: {
    width: '11%',
    paddingTop: 36,
    textAlign: 'center',
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    borderRightWidth: 1,
    borderRightColor: borderColor,
  },
  tdAmountCol: {
    width: '12%',
    paddingTop: 40,
    paddingRight: 4,
    textAlign: 'right',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },

  // Subtotal Row
  subtotalRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  subtotalLabel: {
    width: '65%',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    paddingLeft: 4,
  },
  subtotalTaxVal: {
    width: '17%',
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    color: '#111111',
  },
  subtotalAmountVal: {
    width: '18%',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    paddingRight: 4,
    color: '#111111',
  },

  // 5. Total Amount (in words) Bar
  wordsContainer: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  wordsText: {
    fontSize: 8.5,
    color: '#111111',
  },

  // 6. Bottom Split Section
  bottomSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomLeftCol: {
    width: '49%',
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    padding: 6,
  },
  bottomRightCol: {
    width: '49%',
    justifyContent: 'space-between',
  },

  sectionHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
    marginTop: 2,
  },
  bankText: {
    fontSize: 8,
    color: '#222222',
    lineHeight: 1.3,
  },
  termsText: {
    fontSize: 7.5,
    color: '#333333',
    lineHeight: 1.25,
    marginBottom: 2,
  },

  // Right column summary table
  summaryTable: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  summaryLabel: {
    fontSize: 8.5,
    color: '#333333',
  },
  summaryValue: {
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
  },

  // Highlighted Total Box
  totalAmountBox: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmountLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  totalAmountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },

  // 7. Authorised Signatory Footer
  footerSignatorySection: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  stampImage: {
    width: 90,
    height: 50,
    marginBottom: 3,
    objectFit: 'contain',
  },
  signatoryText: {
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#222222',
    textAlign: 'right',
  },
  signatoryCompany: {
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    marginTop: 1,
  },
});

/**
 * React PDF Document component formatted for G. M. ENTERPRISES quotation.
 */
export function QuotationPdfDocument({ data = {} }) {
  const selectedThemeKey = data.theme || 'red';
  const activeTheme = PDF_THEMES[selectedThemeKey] || PDF_THEMES.red;
  const primaryColor = activeTheme.primary;
  const highlightColor = activeTheme.highlight;

  const {
    companyName = 'G. M. ENTERPRISES',
    addressSubHeader = 'Main Road Nagbhid, Dist. Chandrapur',
    specialistTag = 'Specialist in : Solar Energy Solutions',
    companyMobile = '7798936573',
    companyPan = 'CBAPD7536B',
    companyEmail = 'goyaldamale@gmail.com',
    companyGstin = '27CBAPD7536B1Z3',
    logoUrl = defaultLogo,

    quotationNo = '24',
    quotationDate = '19/08/2026',
    expiryDate = '30/09/2026',

    customerName = '',
    customerAddress = '',
    customerPinCode = '442605',
    customerMobile = '',
    placeOfSupply = 'Maharashtra',

    shipToSameAsBillTo = true,
    shippingName = '',
    shippingAddress = '',
    shippingPinCode = '',
    shippingMobile = '',

    items = [
      { name: 'Waree Panel Top-con 575/580', kw: '5 KW', qty: '9' },
      { name: 'Inverter (POLYCAB)', kw: '5 KW', qty: '1' },
      { name: 'C-channel nut bolt structure', kw: '', qty: '1' },
      { name: 'ACDB/DCDB cable', kw: '', qty: '1' },
      { name: 'DC Cable Polycab', kw: '', qty: '1' },
      { name: 'Lightning Arester', kw: '', qty: '1' },
      { name: 'Earthing rod', kw: '', qty: '3' },
    ],

    rateAmount = '2,94,500',
    taxAmountText = '15,500',
    taxPercentageText = '5%',
    totalAmountText = '3,10,000',
    taxableAmount = '2,94,500',
    cgstText = '7,750',
    sgstText = '7,750',
    cgstRate = '2.5%',
    sgstRate = '2.5%',
    totalWords: overrideTotalWords,

    bankDetails = {
      name: 'G. M. Enterprises',
      ifsc: 'SBIN0011424',
      accountNo: '44894782843',
      bank: 'STATE BANK OF INDIA',
      branch: 'NAGBHID',
    },

    terms = [
      'This invoice shows actual price of goods and all particulars are true and correct.',
      'Goods once sold will not be taken back.',
      'All disputes subject to Gadchiroli jurisdiction.',
      'Warranty Will be applicable as per manufacture terms only.',
      '5 Year Maintenance Free',
    ],

    signatureUrl = defaultSignature,
  } = data;

  // Auto-calculate words if numeric total exists
  const numericVal = Number(String(totalAmountText).replace(/,/g, '')) || 310000;
  const totalWords = overrideTotalWords || numberToWordsIndian(numericVal);

  return (
    <Document title={`Quotation_${quotationNo || '24'}`}>
      <Page size="A4" style={styles.page}>
        {/* Top Heading QUOTATION */}
        <Text style={[styles.topHeadingTitle, { color: primaryColor }]}>QUOTATION</Text>

        {/* 1. Header Section */}
        <View style={styles.topHeaderContainer}>
          <View style={styles.headerLeft}>
            <Text style={[styles.companyTitle, { color: primaryColor }]}>{companyName}</Text>
            <Text style={styles.addressSubHeader}>{addressSubHeader}</Text>
            <Text style={[styles.specialistTag, { color: primaryColor }]}>{specialistTag}</Text>
            <Text style={styles.companyMetaText}>
              Mobile No.{companyMobile}
            </Text>
            <Text style={styles.companyMetaText}>
              Pan Number : {companyPan}
            </Text>
            <Text style={styles.companyMetaText}>
              Email : <Text style={styles.metaLink}>{companyEmail}</Text>
            </Text>
            <Text style={styles.companyMetaText}>
              GSTIN : {companyGstin}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {/* Replace Safety First with Top Right Logo */}
            <Image style={styles.topRightLogo} src={logoUrl || defaultLogo} />
          </View>
        </View>

        {/* Double Divider Rules */}
        <View style={[styles.thinRedLine, { borderBottomColor: primaryColor }]} />
        <View style={[styles.thickRedLine, { borderBottomColor: primaryColor }]} />

        {/* 2. Quotation Meta Banner */}
        <View style={[styles.bannerContainer, { backgroundColor: primaryColor }]}>
          <Text style={styles.bannerItem}>Quotation No : {quotationNo}</Text>
          <Text style={styles.bannerItem}>Quotation Date : {quotationDate}</Text>
          <Text style={styles.bannerItem}>Expiry Date : {expiryDate}</Text>
        </View>

        {/* 3. BILL TO / SHIP TO */}
        <View style={styles.billShipContainer}>
          <View style={styles.billShipCol}>
            <Text style={[styles.boxHeading, { color: primaryColor }]}>BILL TO</Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Name: </Text>
              {customerName}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Address: </Text>
              {customerAddress}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Pin Code: </Text>
              {customerPinCode}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Mobile: </Text>
              {customerMobile}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Place of Supply: </Text>
              {placeOfSupply}
            </Text>
          </View>

          <View style={[styles.billShipCol, styles.colDivider]}>
            <Text style={[styles.boxHeading, { color: primaryColor }]}>SHIP TO</Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Name: </Text>
              {shipToSameAsBillTo ? customerName : shippingName || customerName}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Address: </Text>
              {shipToSameAsBillTo ? customerAddress : shippingAddress || customerAddress}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Pin Code: </Text>
              {shipToSameAsBillTo ? customerPinCode : shippingPinCode || customerPinCode}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Mobile: </Text>
              {shipToSameAsBillTo ? customerMobile : shippingMobile || customerMobile}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldInline}>Place of Supply: </Text>
              {placeOfSupply}
            </Text>
          </View>
        </View>

        {/* 4. ITEMS Table (Columns: ITEMS | KW | QTY | RATE | TAX | AMOUNT) */}
        <View style={styles.tableContainer}>
          <View style={[styles.tableHeader, { backgroundColor: primaryColor }]}>
            <Text style={styles.thItems}>ITEMS</Text>
            <Text style={styles.thKw}>KW</Text>
            <Text style={styles.thItemQty}>QTY</Text>
            <Text style={styles.thRate}>RATE</Text>
            <Text style={styles.thTax}>TAX</Text>
            <Text style={styles.thAmount}>AMOUNT</Text>
          </View>

          <View style={styles.tableBodyRow}>
            {/* Left 3 Sub-Columns: Item Name | KW | QTY */}
            <View style={styles.leftItemsBlock}>
              {items && items.map((item, idx) => {
                const nameStr = typeof item === 'string' ? item : item.name || '';
                const kwRaw = typeof item === 'object' && item.kw ? item.kw : '';
                const kwStr = kwRaw === 'N/A' ? '' : kwRaw;
                const qtyStr = typeof item === 'object' && item.qty ? item.qty : '';

                return (
                  <View key={idx} style={styles.itemRowFlex}>
                    <Text style={styles.colNameText}>{idx + 1}.  {nameStr}</Text>
                    <Text style={styles.colKwText}>{kwStr}</Text>
                    <Text style={styles.colQtyText}>{qtyStr}</Text>
                  </View>
                );
              })}
            </View>

            {/* Right Columns */}
            <View style={styles.tdRateCol}>
              <Text>{rateAmount}</Text>
            </View>
            <View style={styles.tdTaxCol}>
              <Text>{taxAmountText}</Text>
              <Text style={{ fontSize: 8, marginTop: 2 }}>{taxPercentageText}</Text>
            </View>
            <View style={styles.tdAmountCol}>
              <Text>{totalAmountText}</Text>
            </View>
          </View>

          {/* Subtotal Row */}
          <View style={[styles.subtotalRow, { backgroundColor: highlightColor }]}>
            <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
            <Text style={styles.subtotalTaxVal}>{taxAmountText}</Text>
            <Text style={styles.subtotalAmountVal}>{totalAmountText}</Text>
          </View>
        </View>

        {/* 5. Total Amount (in words) Bar */}
        <View style={styles.wordsContainer}>
          <Text style={styles.wordsText}>
            <Text style={styles.boldInline}>Total Amount (in words): </Text>
            {totalWords}
          </Text>
        </View>

        {/* 6. Bottom Split Section */}
        <View style={styles.bottomSplit}>
          {/* Left Column: Bank Details & Terms */}
          <View style={styles.bottomLeftCol}>
            <Text style={[styles.sectionHeader, { color: primaryColor }]}>BANK DETAILS</Text>
            <Text style={styles.bankText}>
              <Text style={styles.boldInline}>Name: </Text>{bankDetails.name}
            </Text>
            <Text style={styles.bankText}>
              <Text style={styles.boldInline}>IFSC Code: </Text>{bankDetails.ifsc}
            </Text>
            <Text style={styles.bankText}>
              <Text style={styles.boldInline}>Account No: </Text>{bankDetails.accountNo}
            </Text>
            <Text style={styles.bankText}>
              <Text style={styles.boldInline}>Bank: </Text>{bankDetails.bank}
            </Text>
            <Text style={styles.bankText}>
              <Text style={styles.boldInline}>Branch: </Text>{bankDetails.branch}
            </Text>

            <Text style={[styles.sectionHeader, { color: primaryColor, marginTop: 8 }]}>TERMS AND CONDITIONS</Text>
            {terms.map((term, tIdx) => (
              <Text key={tIdx} style={styles.termsText}>
                {tIdx + 1}. {term}
              </Text>
            ))}
          </View>

          {/* Right Column: Tax Summary & Total Amount Box */}
          <View style={styles.bottomRightCol}>
            <View style={styles.summaryTable}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxable Amount</Text>
                <Text style={styles.summaryValue}>{taxableAmount}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>CGST @ {cgstRate}</Text>
                <Text style={styles.summaryValue}>{cgstText}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>SGST @ {sgstRate}</Text>
                <Text style={styles.summaryValue}>{sgstText}</Text>
              </View>
            </View>

            <View style={[styles.totalAmountBox, { backgroundColor: highlightColor }]}>
              <Text style={[styles.totalAmountLabel, { color: primaryColor }]}>Total Amount</Text>
              <Text style={[styles.totalAmountValue, { color: primaryColor }]}>{totalAmountText} /-</Text>
            </View>
          </View>
        </View>

        {/* 7. Signatory Footer */}
        <View style={styles.footerSignatorySection}>
          {signatureUrl ? (
            <Image style={styles.stampImage} src={signatureUrl} />
          ) : null}
          <Text style={styles.signatoryText}>AUTHORISED SIGNATORY FOR</Text>
          <Text style={[styles.signatoryCompany, { color: primaryColor }]}>{companyName}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default QuotationPdfDocument;
