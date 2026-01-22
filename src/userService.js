let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];

let nextId = 3;

    const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const userService = {
  getAllUsers: () => {
    return [...users];
  },

  getUserById: id => {
    return users.find(user => user.id === parseInt(id, 10));
  },

  createUser: (name, email) => {
  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Invalid email format');
  }

  const existingUser = users.find(
    user => user.email === normalizedEmail
  );

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const newUser = {
    id: nextId++,
    name: name.trim(),
    email: normalizedEmail
  };

  users.push(newUser);
  return newUser;
},


  updateUser: (id, updates) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id, 10));
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  if (updates.email) {
    const normalizedEmail = updates.email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      throw new Error('Invalid email format');
    }

    const emailExists = users.some(
      user =>
        user.email === normalizedEmail &&
        user.id !== parseInt(id, 10)
    );

    if (emailExists) {
      throw new Error('User with this email already exists');
    }

    updates.email = normalizedEmail;
  }

  users[userIndex] = { ...users[userIndex], ...updates };
  return users[userIndex];
},


  deleteUser: id => {
    const userIndex = users.findIndex(user => user.id === parseInt(id, 10));
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    return deletedUser;
  },

  resetUsers: () => {
    users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
    ];
    nextId = 3;
  }
};

module.exports = { userService };
