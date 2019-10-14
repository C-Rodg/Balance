// **************************************************** //
// This file provides documentation of
// object shapes used within the application
// **************************************************** //

// Default Category Item
const DEFAULT_CATEGORY_ITEM = {
  iconName: 'cart',
  iconLibrary: 'MaterialCommunityIcon',
  categoryName: 'Shopping',
};

// Category Breakdown
const CATEGORY_BREAKDOWN = {
  iconName: 'cart', // TODO:
  iconLibrary: 'MaterialCommunityIcon', // used above, maybe just have an ID instead?
  categoryName: 'Candy',
  amountSpent: 178,
  amountBudgeted: 200, // null for unbudgeted
};

// Expense List Item
const EXPENSE_LIST_ITEM = {
  expenseId: 1,
  categoryIcon: 'cart', // TODO: have this in duplicate places, maybe just have category ID instead and match?
  categoryName: 'Shopping', // TODO: same as above?
  expenseTitle: 'Chipotle',
  amount: 896,
};

// ------ RE WORKED ------ //
const CATEGORY = {
  categoryId: 'categoryname-iconname-iconlibrary',
  categoryName: 'Shopping',
  iconLibrary: 'MaterialCommunityIcon',
  iconName: 'cart',
};

const BUDGET = {
  budgetId: '', // date?
  categoryId: 'categoryname-iconname-iconlibrary', // ties it to a category
  amountBudgeted: 200,
};

const EXPENSE = {
  expenseId: '',
  categoryId: '', // ties it to a category
  expneseTitle: 'Chipotle',
  amount: 896,
  expenseDate: '2019-08-06',
};
