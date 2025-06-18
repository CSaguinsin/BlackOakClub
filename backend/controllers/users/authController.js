const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fakeAuth = require('../../data/mockEcomDB')


const JWT_SECRET = process.env.JWT_SECRET;

const displayUserData = (req, res) => {
    // Remove passwords from response for security
    const usersWithoutPasswords = fakeAuth.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    res.json(usersWithoutPasswords);
}

const registerNewUser = async (req, res) => {
    try {
        const {
            fullName,
            emailAddress,
            password,
            phoneNumber,
            postalCode,
            city
        } = req.body;

        // Validation
        if (!fullName || !emailAddress || !password) {
            return res.status(400).json({ 
                error: 'Full name, email, and password are required' 
            });
        }

        // Check if user already exists
        const existingUser = fakeAuth.find(user => user.emailAddress === emailAddress);
        if (existingUser) {
            return res.status(409).json({ 
                error: 'User with this email already exists' 
            });
        }

        // Hash password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id: fakeAuth.length + 1,
            fullName,
            emailAddress,
            password: hashedPassword, // Store hashed password
            phoneNumber,
            postalCode,
            city,
            createdAt: new Date().toISOString()
        };

        fakeAuth.push(newUser);

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: newUser.id, 
                email: newUser.emailAddress 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user data without password
        const { password: _, ...userResponse } = newUser;
        
        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;

        // Validation
        if (!emailAddress || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        // Find user by email
        const user = fakeAuth.find(user => user.emailAddress === emailAddress);
        if (!user) {
            return res.status(401).json({ 
                error: 'Invalid email or password' 
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.emailAddress 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user data without password
        const { password: _, ...userResponse } = user;

        res.status(200).json({
            message: 'Login successful',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};

const updateUserData = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {
            fullName,
            emailAddress,
            password,
            phoneNumber,
            postalCode,
            city
        } = req.body;

        const index = fakeAuth.findIndex(user => user.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update fields if provided
        if (fullName !== undefined) fakeAuth[index].fullName = fullName;
        if (emailAddress !== undefined) fakeAuth[index].emailAddress = emailAddress;
        if (phoneNumber !== undefined) fakeAuth[index].phoneNumber = phoneNumber;
        if (postalCode !== undefined) fakeAuth[index].postalCode = postalCode;
        if (city !== undefined) fakeAuth[index].city = city;
        
        // Hash new password if provided
        if (password !== undefined) {
            const saltRounds = 10;
            fakeAuth[index].password = await bcrypt.hash(password, saltRounds);
        }

        fakeAuth[index].updatedAt = new Date().toISOString();

        // Return user data without password
        const { password: _, ...userResponse } = fakeAuth[index];
        
        res.json({
            message: 'User updated successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error during update' });
    }
};

const logoutUser = (req, res) => {
    // For JWT, logout is typically handled on the frontend by removing the token
    // But we can still provide a logout endpoint for completeness
    res.status(200).json({ 
        message: 'Logout successful. Please remove the token from your client.' 
    });
};

module.exports = {
    registerNewUser,
    loginUser,
    displayUserData,
    updateUserData,
    logoutUser
}