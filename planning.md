# G. M. ENTERPRIZES -- Quotation Generator Website

## Project Overview

Create a simple, clean, responsive web application for **Universal Solar
Solutions** that allows the user to:

1.  Enter customer/billing details.
2.  Add one or more solar-product items.
3.  Select the KW range and enter quantity for each item.
4.  Enter a single GST percentage and a single total amount for the
    complete bill.
5.  Preview the completed quotation in a professional quotation layout.
6.  Print the quotation or save it as a PDF using the browser print
    dialog.

The quotation design should be visually inspired by the uploaded
reference quotation: professional invoice/quotation style, company
heading at the top, customer details section, item table, GST/amount
summary, total amount, terms and conditions, and authorized-signatory
area.

------------------------------------------------------------------------

## Company Details

The company name should be **editable through an input field**, with:

**Default company name:** `G. M. ENTERPRIZES`

The company name must appear prominently at the top of the quotation
preview.

Also provide optional editable fields for:

-   Company address
-   Mobile number
-   Email
-   PAN Number
-   GSTIN
-   Quotation Number
-   Quotation Date
-   Expiry Date

If optional company fields are left empty, they should not create
awkward blank spaces in the preview.

------------------------------------------------------------------------

## Customer / Billing Form

Create a responsive form with the following fields:

### Customer Details

-   **Name** -- text input
-   **Consumer No** -- text input
-   **Address** -- textarea
-   **Pin Code** -- number/text input
-   **Mobile** -- text input
-   **Place of Supply** -- text input

The form should be mobile-friendly and use a clean two-column layout on
desktop and a single-column layout on smaller screens.

------------------------------------------------------------------------

## Item Form

The user should be able to add multiple items.

Each item should contain:

### Item Name

Provide a dropdown/select containing these default options:

1.  Waree Panel Top-con 575/580
2.  Waree Panel Bificial 575/580
3.  Adani Top-con
4.  Adani Bificial
5.  C-channel nut bolt structure
6.  ACDB/DCDB cable
7.  Lightning Arester
8.  Earthing rod

Also provide an **"Add Item"** button so the user can add multiple item
rows.

Each added item should have a **Remove** button.

### KW

Provide a dropdown/select with:

-   3 KW
-   4 KW
-   5 KW
-   6 KW
-   7 KW

### Quantity

Provide a numeric input.

Allow positive whole numbers only.

------------------------------------------------------------------------

## Billing / Amount Details

GST and amount should be entered **once for the complete quotation**,
NOT separately for every item.

Provide these fields below the item list:

-   **GST (%)** -- numeric input
-   **Total Amount** -- numeric input

The GST should be displayed as one combined bill-level tax.

For example:

-   Taxable Amount: ₹2,94,500
-   CGST @ 2.5%: ₹7,750
-   SGST @ 2.5%: ₹7,750
-   Total Amount: ₹3,10,000

The application should calculate the tax summary based on the entered
taxable amount and GST percentage.

For a GST value of 5%, display:

-   CGST @ 2.5%
-   SGST @ 2.5%

For other GST percentages, split the GST equally between CGST and SGST.

------------------------------------------------------------------------

## Important Amount Logic

Do not add GST separately to every item.

There should be:

**Items → Taxable Amount → GST → Final Total**

The item table can display the item name, KW and quantity, while the
financial summary is displayed once below the table.

If the user enters a final total amount manually, clearly label the
field as **Total Amount** and use it in the preview.

Avoid creating conflicting totals.

------------------------------------------------------------------------

## Quotation Preview

After filling the form, show a live or generated preview of the
quotation.

The preview should look similar to a professional business quotation.

### Header

Display:

**G. M. ENTERPRIZES**

Below it, show optional company information:

-   Address
-   Mobile
-   Email
-   PAN
-   GSTIN

On the right side, show:

-   Quotation No.
-   Quotation Date
-   Expiry Date

------------------------------------------------------------------------

## Bill To / Ship To

Create two sections similar to the reference quotation:

### BILL TO

Display:

-   Name
-   Address
-   Pin Code
-   Mobile
-   Place of Supply

### SHIP TO

For simplicity, initially use the same customer information as BILL TO.

Optionally provide a checkbox:

**Ship To same as Bill To**

If unchecked, allow separate shipping details.

------------------------------------------------------------------------

## Items Table

Create a professional table with columns:

  \#   Item   KW   Qty
  ---- ------ ---- -----

Example:

| 1 \| Waree Panel Top-con 575/580 \| 5 KW \| 9 \|
| 2 \| C-channel nut bolt structure \| 5 KW \| 1 \|
| 3 \| ACDB/DCDB cable \| 5 KW \| 1 \|

The table should support an unlimited number of added items.

------------------------------------------------------------------------

## Amount Summary

Below the item table, display:

-   Taxable Amount
-   CGST
-   SGST
-   Total Amount

Example:

**Taxable Amount:** ₹2,94,500

**CGST @ 2.5%:** ₹7,750

**SGST @ 2.5%:** ₹7,750

**Total Amount:** ₹3,10,000/-

Also display:

**Total Amount in Words: Three Lakh Ten Thousand Rupees Only**

Convert the numeric total amount into Indian currency words.

------------------------------------------------------------------------

## Terms and Conditions

Add an editable terms-and-conditions section.

Default terms:

Prices and particulars mentioned are true and correct.
Goods once sold are non-returnable.
All disputes are subject to applicable jurisdiction.
Warranty is as per the manufacturer’s terms.
Maintenance is as per applicable terms.

Allow the user to edit or add terms if needed.

------------------------------------------------------------------------

## Authorized Signatory

At the bottom-right of the quotation, show:

in assests a image signature.png  is uploaded use that if not uploaded by user

**AUTHORISED SIGNATORY FOR**

**G. M. ENTERPRIZES**

Optionally provide an input for:

-   Authorized Signatory Name

Do not require a signature image initially.

------------------------------------------------------------------------

## Responsive Design

The website must be fully responsive.

### Desktop

Use:

-   Two-column form layout where appropriate.
-   Wide quotation preview.
-   Professional invoice-style spacing.

### Tablet

Use:

-   Reduced columns.
-   Responsive item table.

### Mobile

Use:

-   Single-column form.
-   Item rows stacked vertically.
-   Horizontal scrolling only where absolutely necessary.
-   Large touch-friendly buttons.
-   Preview should fit the screen and remain printable.

------------------------------------------------------------------------

## User Flow

### Step 1 -- Enter Company Details

User enters or edits:

-   Company name
-   Company information
-   Quotation details

Default company name:

**G. M. ENTERPRIZES**

### Step 2 -- Enter Customer Details

User enters:

-   Name
-   Address
-   Pin Code
-   Mobile
-   Place of Supply

### Step 3 -- Add Items

User selects:

-   Item
-   KW
-   Quantity

Then clicks:

**+ Add Item**

Allow multiple items.

### Step 4 -- Enter GST and Amount

User enters:

-   GST %
-   Total Amount

### Step 5 -- Preview

Click:

**Preview Quotation**

Display a professional quotation preview.

### Step 6 -- Print / PDF

Provide buttons:

-   **Print Quotation**
-   **Save as PDF**

Use browser print functionality so the user can select **Save as PDF**.

------------------------------------------------------------------------

## Print Design

The printed PDF should resemble the uploaded quotation reference.

Use:

-   A4 page size.
-   Proper margins.
-   Clean borders.
-   Professional red/dark-red accent similar to the reference.
-   Company name prominently displayed.
-   Clear table borders.
-   Highlighted total amount box.
-   No unnecessary web UI elements in the printed version.

When printing:

-   Hide the form.
-   Hide Add Item / Remove Item buttons.
-   Hide navigation/buttons that are not part of the quotation.
-   Print only the quotation preview.


------------------------------------------------------------------------

## Validation

Add basic frontend validation:

-   Company name is required.
-   Customer name is required.
-   Address is required.
-   Pin code should contain a valid Indian PIN format.
-   Mobile should contain a valid Indian mobile number.
-   At least one item is required.
-   Item name is required.
-   KW is required.
-   Quantity must be greater than 0.
-   GST must be 0 or greater.
-   Amount must be greater than 0.

Show clear validation messages near the relevant fields.

------------------------------------------------------------------------

## UI Requirements

Keep the UI simple and professional.

Suggested structure:

``` text
------------------------------------------------
G. M. ENTERPRIZES
Quotation Generator
------------------------------------------------

Company Details
[ Company Name                    ]
[ Address                         ]
[ Mobile ] [ Email ]
[ PAN ]    [ GSTIN ]

Quotation Details
[ Quotation No. ] [ Date ] [ Expiry Date ]

Customer Details
[ Name                           ]
[ Address                        ]
[ Pin Code ] [ Mobile ]
[ Place of Supply                ]

Items
------------------------------------------------
Item                  KW       Qty       Action
------------------------------------------------
Waree Panel...        5 KW      9       Remove
------------------------------------------------

[ + Add Item ]

Billing
GST (%): [ 5 ]
Total Amount: [ ₹310000 ]

[ Preview Quotation ]

------------------------------------------------

Quotation Preview
------------------------------------------------

G. M. ENTERPRIZES

Quotation No: 24
Date: 19/08/2026
Expiry: 30/09/2026

BILL TO                         SHIP TO
Customer Name                   Customer Name
Address                         Address
Pin Code                        Pin Code
Mobile                          Mobile
Place of Supply                 Place of Supply

ITEMS
------------------------------------------------
#   ITEM                         KW       QTY
------------------------------------------------
1   Waree Panel Top-con 575/580  5 KW      9
2   C-channel structure          5 KW      1
------------------------------------------------

Taxable Amount                  ₹2,94,500
CGST @ 2.5%                     ₹7,750
SGST @ 2.5%                     ₹7,750

TOTAL AMOUNT                    ₹3,10,000/-

Amount in Words:
Three Lakh Ten Thousand Rupees Only

Terms & Conditions

1. ...
2. ...
3. ...

                    AUTHORISED SIGNATORY
                    FOR G. M. ENTERPRIZES

[ Print Quotation ] [ Save as PDF ]
```

------------------------------------------------------------------------

## Recommended Technical Implementation

Build this as a frontend-only application initially.

Suggested stack:

-   React
-   TypeScript
-   Tailwind CSS
-   React Hook Form or controlled React state
-   Browser `window.print()` for PDF generation
-   CSS `@media print` for A4 formatting

No backend is required for the first version.

Keep all quotation data in frontend state.

------------------------------------------------------------------------

## Important Requirements Summary

-   Company name must be editable.
-   Default company name: **G. M. ENTERPRIZES**.
-   Customer fields: Name, Address, Pin Code, Mobile, Place of Supply.
-   Multiple items supported.
-   Add Item button required.
-   Remove Item button required.
-   Item names must come from the provided list but allow easy future
    expansion.
-   KW options: 3 KW to 7 KW.
-   Quantity is numeric.
-   GST is entered **once for the whole bill**.
-   Amount is entered **once for the whole bill**.
-   Do NOT put separate GST/amount fields on every item.
-   Show a professional quotation preview.
-   Preview should resemble the uploaded reference quotation.
-   Responsive on mobile, tablet and desktop.
-   A4 print layout.
-   Print quotation.
-   Save as PDF through browser print.
-   Amount in Indian Rupees.
-   Convert total amount into Indian currency words.
-   Use Indian CGST/SGST split.
-   Include editable terms and conditions.
-   Include authorized-signatory section.
