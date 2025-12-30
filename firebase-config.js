// ================================
// 🔥 Firebase Configuration & Helper Functions
// ================================
// File: firebase-config.js
// Place this file in the same directory as your HTML files

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIiw1jcMGouxlpbCm1Qfack5ehBfqdASw",
  authDomain: "fund-monitering-tool.firebaseapp.com",
  databaseURL: "https://fund-monitering-tool-default-rtdb.firebaseio.com",
  projectId: "fund-monitering-tool",
  storageBucket: "fund-monitering-tool.firebasestorage.app",
  messagingSenderId: "498728137004",
  appId: "1:498728137004:web:5e79f48cc301df62a3fc89"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database reference
const db = firebase.database();

// ================================
// 📦 Common Database Functions
// ================================

// Save new data with auto-generated key
function saveData(path, data) {
  return db.ref(path).push(data);
}

// Save data with custom key
function saveDataWithKey(path, key, data) {
  return db.ref(`${path}/${key}`).set(data);
}

// Update existing data
function updateData(path, data) {
  return db.ref(path).update(data);
}

// Delete data
function deleteData(path) {
  return db.ref(path).remove();
}

// Read data (real-time listener)
function readData(path, callback) {
  db.ref(path).on("value", snapshot => {
    callback(snapshot.val());
  });
}

// Read data once (no listener)
function readOnce(path) {
  return db.ref(path).once("value").then(snapshot => {
    return snapshot.val();
  });
}

// ================================
// 🔐 User Session Management
// ================================

// Get current user session
function getCurrentUser() {
  const session = sessionStorage.getItem('currentSession');
  return session ? JSON.parse(session) : null;
}

// Get user-specific path
function getUserPath(basePath) {
  const user = getCurrentUser();
  if (!user) {
    console.error('No user session found');
    return null;
  }
  return `users/${user.userId}/${basePath}`;
}

// ================================
// 📊 Project Data Functions
// ================================

// Save project
function saveProject(projectData) {
  const path = getUserPath('projects');
  if (!path) return Promise.reject('No user session');
  
  return saveDataWithKey(path, projectData.id, {
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

// Get all projects for current user
function getProjects(callback) {
  const path = getUserPath('projects');
  if (!path) return;
  
  readData(path, (data) => {
    const projects = data ? Object.values(data) : [];
    callback(projects);
  });
}

// Delete project
function deleteProject(projectId) {
  const path = getUserPath(`projects/${projectId}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// ================================
// 💰 Expense Data Functions
// ================================

// Save expense
function saveExpense(expenseData) {
  const path = getUserPath('expenses');
  if (!path) return Promise.reject('No user session');
  
  return saveData(path, {
    ...expenseData,
    createdAt: new Date().toISOString()
  });
}

// Get all expenses for current user
function getExpenses(callback) {
  const path = getUserPath('expenses');
  if (!path) return;
  
  readData(path, (data) => {
    const expenses = [];
    if (data) {
      Object.keys(data).forEach(key => {
        expenses.push({ firebaseKey: key, ...data[key] });
      });
    }
    callback(expenses);
  });
}

// Delete expense
function deleteExpense(firebaseKey) {
  const path = getUserPath(`expenses/${firebaseKey}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// ================================
// 📄 Revenue Data Functions
// ================================

// Save revenue/invoice
function saveRevenue(revenueData) {
  const path = getUserPath('revenues');
  if (!path) return Promise.reject('No user session');
  
  return saveData(path, {
    ...revenueData,
    createdAt: new Date().toISOString()
  });
}

// Get all revenues for current user
function getRevenues(callback) {
  const path = getUserPath('revenues');
  if (!path) return;
  
  readData(path, (data) => {
    const revenues = [];
    if (data) {
      Object.keys(data).forEach(key => {
        revenues.push({ firebaseKey: key, ...data[key] });
      });
    }
    callback(revenues);
  });
}

// Delete revenue
function deleteRevenue(firebaseKey) {
  const path = getUserPath(`revenues/${firebaseKey}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// ================================
// 💵 Finance Data Functions (Income, Expenses, Assets, Liabilities)
// ================================

// Save income
function saveIncome(incomeData) {
  const path = getUserPath('finance/incomes');
  if (!path) return Promise.reject('No user session');
  
  return saveData(path, {
    ...incomeData,
    createdAt: new Date().toISOString()
  });
}

// Get all incomes
function getIncomes(callback) {
  const path = getUserPath('finance/incomes');
  if (!path) return;
  
  readData(path, (data) => {
    const incomes = [];
    if (data) {
      Object.keys(data).forEach(key => {
        incomes.push({ firebaseKey: key, ...data[key] });
      });
    }
    callback(incomes);
  });
}

// Delete income
function deleteIncome(firebaseKey) {
  const path = getUserPath(`finance/incomes/${firebaseKey}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// Save finance expense
function saveFinanceExpense(expenseData) {
  const path = getUserPath('finance/expenses');
  if (!path) return Promise.reject('No user session');
  
  return saveData(path, {
    ...expenseData,
    createdAt: new Date().toISOString()
  });
}

// Get all finance expenses
function getFinanceExpenses(callback) {
  const path = getUserPath('finance/expenses');
  if (!path) return;
  
  readData(path, (data) => {
    const expenses = [];
    if (data) {
      Object.keys(data).forEach(key => {
        expenses.push({ firebaseKey: key, ...data[key] });
      });
    }
    callback(expenses);
  });
}

// Delete finance expense
function deleteFinanceExpense(firebaseKey) {
  const path = getUserPath(`finance/expenses/${firebaseKey}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// Save asset
function saveAsset(assetData) {
  const path = getUserPath('finance/assets');
  if (!path) return Promise.reject('No user session');
  
  return saveData(path, {
    ...assetData,
    createdAt: new Date().toISOString()
  });
}

// Get all assets
function getAssets(callback) {
  const path = getUserPath('finance/assets');
  if (!path) return;
  
  readData(path, (data) => {
    const assets = [];
    if (data) {
      Object.keys(data).forEach(key => {
        assets.push({ firebaseKey: key, ...data[key] });
      });
    }
    callback(assets);
  });
}

// Delete asset
function deleteAsset(firebaseKey) {
  const path = getUserPath(`finance/assets/${firebaseKey}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// Save liability
function saveLiability(liabilityData) {
  const path = getUserPath('finance/liabilities');
  if (!path) return Promise.reject('No user session');
  
  return saveData(path, {
    ...liabilityData,
    createdAt: new Date().toISOString()
  });
}

// Get all liabilities
function getLiabilities(callback) {
  const path = getUserPath('finance/liabilities');
  if (!path) return;
  
  readData(path, (data) => {
    const liabilities = [];
    if (data) {
      Object.keys(data).forEach(key => {
        liabilities.push({ firebaseKey: key, ...data[key] });
      });
    }
    callback(liabilities);
  });
}

// Delete liability
function deleteLiability(firebaseKey) {
  const path = getUserPath(`finance/liabilities/${firebaseKey}`);
  if (!path) return Promise.reject('No user session');
  
  return deleteData(path);
}

// ================================
// 🔄 Migration Helper (Optional)
// ================================

// Migrate data from localStorage to Firebase
function migrateLocalStorageToFirebase() {
  const user = getCurrentUser();
  if (!user) {
    console.log('No user logged in. Cannot migrate data.');
    return;
  }

  // Migrate projects
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  projects.forEach(project => {
    saveProject(project).catch(err => console.error('Error migrating project:', err));
  });

  // Migrate expenses
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenses.forEach(expense => {
    saveExpense(expense).catch(err => console.error('Error migrating expense:', err));
  });

  // Migrate revenues
  const revenues = JSON.parse(localStorage.getItem('revenues') || '[]');
  revenues.forEach(revenue => {
    saveRevenue(revenue).catch(err => console.error('Error migrating revenue:', err));
  });

  // Migrate finance data
  const incomes = JSON.parse(localStorage.getItem('finance_incomes') || '[]');
  incomes.forEach(income => {
    saveIncome(income).catch(err => console.error('Error migrating income:', err));
  });

  const financeExpenses = JSON.parse(localStorage.getItem('finance_expenses') || '[]');
  financeExpenses.forEach(expense => {
    saveFinanceExpense(expense).catch(err => console.error('Error migrating finance expense:', err));
  });

  const assets = JSON.parse(localStorage.getItem('finance_assets') || '[]');
  assets.forEach(asset => {
    saveAsset(asset).catch(err => console.error('Error migrating asset:', err));
  });

  const liabilities = JSON.parse(localStorage.getItem('finance_liabilities') || '[]');
  liabilities.forEach(liability => {
    saveLiability(liability).catch(err => console.error('Error migrating liability:', err));
  });

  console.log('✅ Data migration initiated. Check Firebase console to verify.');
}

console.log('🔥 Firebase configuration loaded successfully!');