import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { numberToWordsIndian } from './numberToWords';

// Define styles matching the exact reference quotation image using standard built-in Helvetica font
const primaryRed = '#800000'; // Dark Red / Maroon matching reference
const lightPink = '#fce8e6';  // Light pink highlight matching subtotal & total boxes
const borderColor = '#cccccc';

const styles = StyleSheet.create({
  page: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 28,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#111111',
    backgroundColor: '#ffffff',
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
    color: primaryRed,
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
    color: primaryRed,
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
  },
  safetyTag: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#666666',
    marginTop: 2,
  },

  // Double horizontal rule
  thinRedLine: {
    borderBottomWidth: 1,
    borderBottomColor: primaryRed,
    marginTop: 4,
    marginBottom: 2,
  },
  thickRedLine: {
    borderBottomWidth: 3,
    borderBottomColor: primaryRed,
    marginBottom: 8,
  },

  // 2. Red Quotation Meta Banner
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: primaryRed,
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
    color: primaryRed,
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

  // 4. ITEMS Table Section
  tableContainer: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 2,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: primaryRed,
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  thItems: {
    width: '55%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    paddingLeft: 4,
  },
  thQty: {
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
  tdItemsCol: {
    width: '55%',
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: borderColor,
  },
  itemLine: {
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    marginBottom: 4,
  },
  tdQtyCol: {
    width: '10%',
    paddingTop: 40,
    textAlign: 'center',
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    borderRightWidth: 1,
    borderRightColor: borderColor,
  },
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
    backgroundColor: lightPink,
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  subtotalLabel: {
    width: '55%',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    paddingLeft: 4,
  },
  subtotalBlankQty: {
    width: '10%',
  },
  subtotalBlankRate: {
    width: '12%',
  },
  subtotalTaxVal: {
    width: '11%',
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    color: '#111111',
  },
  subtotalAmountVal: {
    width: '12%',
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

  // 6. Bottom Split Section (Bank Details & Terms LEFT | Summary & Total RIGHT)
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
    color: primaryRed,
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
    backgroundColor: lightPink,
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
    color: primaryRed,
  },
  totalAmountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: primaryRed,
  },

  // 7. Authorised Signatory Footer
  footerSignatorySection: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  stampImage: {
    width: 80,
    height: 45,
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
    color: '#111111',
    textAlign: 'right',
    marginTop: 1,
  },
});

/**
 * React PDF Document component formatted exactly like the G. M. ENTERPRISES quotation reference image.
 */
export function QuotationPdfDocument({ data = {} }) {
  const {
    companyName = 'G. M. ENTERPRISES',
    addressSubHeader = 'Main Road Nagbhid, Dist. Chandrapur',
    specialistTag = 'Specialist in : Solar Energy Solutions',
    companyMobile = '7798936573',
    companyPan = 'CBAPD7536B',
    companyEmail = 'goyaldamale@gmail.com',
    companyGstin = '27CBAPD7536B1Z3',
    safetyTag = 'Safety First...!',

    quotationNo = '24',
    quotationDate = '19/08/2026',
    expiryDate = '30/09/2026',

    customerName = 'Yamaji Ganpat Undirwade',
    customerAddress = 'Gondwana University,Navegaon Complex ,Gadchiroli',
    customerPinCode = '442605',
    customerMobile = '8329861988',
    placeOfSupply = 'Maharashtra',

    shipToSameAsBillTo = true,
    shippingName = '',
    shippingAddress = '',
    shippingPinCode = '',
    shippingMobile = '',

    items = [
      { name: 'Waaree Panel Top-Con 575/580 - 9 Panel * 25 Year Warranty' },
      { name: 'Polycab 5kw Inverter - 1 * 8 Year Warranty' },
      { name: 'Hot Dip Nut Bolt Structure 5kw - 1 * 10 Year Warranty' },
      { name: 'ACDB/DCDB Havells -1' },
      { name: 'DC Cable Polycab' },
      { name: 'LA -1' },
      { name: 'Earthing Rod -3' },
    ],

    qtyText = '1 SET',
    rateAmount = '2,94,500',
    taxAmountText = '15,500',
    taxPercentageText = '5%',
    totalAmountText = '3,10,000',
    taxableAmount = '2,94,500',
    cgstText = '7,750',
    sgstText = '7,750',
    cgstRate = '2.5%',
    sgstRate = '2.5%',

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

    signatureUrl = '',
  } = data;

  const totalWords = numberToWordsIndian(310000);

  return (
    <Document title={`Quotation_${quotationNo || '24'}`}>
      <Page size="A4" style={styles.page}>
        {/* 1. Header Section */}
        <View style={styles.topHeaderContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyTitle}>{companyName}</Text>
            <Text style={styles.addressSubHeader}>{addressSubHeader}</Text>
            <Text style={styles.specialistTag}>{specialistTag}</Text>
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
            <Text style={styles.safetyTag}>{safetyTag}</Text>
          </View>
        </View>

        {/* Double Red Divider Rules */}
        <View style={styles.thinRedLine} />
        <View style={styles.thickRedLine} />

        {/* 2. Red Quotation Meta Banner */}
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerItem}>Quotation No : {quotationNo}</Text>
          <Text style={styles.bannerItem}>Quotation Date : {quotationDate}</Text>
          <Text style={styles.bannerItem}>Expiry Date : {expiryDate}</Text>
        </View>

        {/* 3. BILL TO / SHIP TO */}
        <View style={styles.billShipContainer}>
          <View style={styles.billShipCol}>
            <Text style={styles.boxHeading}>BILL TO</Text>
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
            <Text style={styles.boxHeading}>SHIP TO</Text>
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

        {/* 4. ITEMS Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.thItems}>ITEMS</Text>
            <Text style={styles.thQty}>QTY.</Text>
            <Text style={styles.thRate}>RATE</Text>
            <Text style={styles.thTax}>TAX</Text>
            <Text style={styles.thAmount}>AMOUNT</Text>
          </View>

          <View style={styles.tableBodyRow}>
            {/* Left Column: Numbered items list */}
            <View style={styles.tdItemsCol}>
              {items && items.map((item, idx) => (
                <Text key={idx} style={styles.itemLine}>
                  {idx + 1}.   {item.name}
                </Text>
              ))}
            </View>

            {/* Right Merged Columns */}
            <View style={styles.tdQtyCol}>
              <Text>{qtyText}</Text>
            </View>
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
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
            <View style={styles.subtotalBlankQty} />
            <View style={styles.subtotalBlankRate} />
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
            <Text style={styles.sectionHeader}>BANK DETAILS</Text>
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

            <Text style={[styles.sectionHeader, { marginTop: 8 }]}>TERMS AND CONDITIONS</Text>
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

            <View style={styles.totalAmountBox}>
              <Text style={styles.totalAmountLabel}>Total Amount</Text>
              <Text style={styles.totalAmountValue}>{totalAmountText} /-</Text>
            </View>
          </View>
        </View>

        {/* 7. Signatory Footer */}
        <View style={styles.footerSignatorySection}>
          {signatureUrl ? (
            <Image style={styles.stampImage} src={signatureUrl} />
          ) : null}
          <Text style={styles.signatoryText}>AUTHORISED SIGNATORY FOR</Text>
          <Text style={styles.signatoryCompany}>{companyName}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default QuotationPdfDocument;
