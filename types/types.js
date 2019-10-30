// **************************************************** //
// This file provides documentation of
// object shapes used within the application
// **************************************************** //

const ICON = {
  iconLibrary: 'MaterialCommunityIcon',
  iconName: 'cart',
};

const EXPENSE = {
  id: '',
  categoryId: '', // ties it to a category
  expenseTitle: 'Chipotle',
  amount: 896,
  expenseDate: '2019-08-06',
  createdAt: new Date(),
};

const CATEGORY = {
  id: 'categoryname-iconname-iconlibrary',
  categoryName: 'Shopping',
  iconLibrary: 'MaterialCommunityIcon',
  iconName: 'cart',
  isStandardCategory: false,
};

const BUDGET = {
  id: '',
  categoryId: 'categoryname-iconname-iconlibrary', // ties it to a category
  amountBudgeted: 780,
};

const USER = {
  uid: 'auth-id',
  email: 'foo@test.com',
  createdAt: new Date(),
};

// --------- FOOO - eventually delete --- //

// Category Breakdown
const CATEGORY_BREAKDOWN = {
  iconName: 'cart', // TODO:
  iconLibrary: 'MaterialCommunityIcon', // used above, maybe just have an ID instead?
  categoryName: 'Candy',
  amountSpent: 178,
  amountBudgeted: 200, // null for unbudgeted
};
