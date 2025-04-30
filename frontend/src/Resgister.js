import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [id]: value
    }));
  };
  
  const validate = () => {
    let tempErrors = {};
    
    if (!user.username) tempErrors.username = "Username is required";
    if (!user.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) tempErrors.email = "Email is invalid";
    
    if (!user.password) tempErrors.password = "Password is required";
    else if (user.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    if (user.password !== user.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
    
    if (!user.firstName) tempErrors.firstName = "First name is required";
    if (!user.lastName) tempErrors.lastName = "Last name is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      try {
        await axios.post('http://localhost:8888/api/users/register', {
          username: user.username,
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName
        });
        
        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.error('Error registering user:', error);
          alert('Registration failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div style={{
      backgroundImage: "url(/mountain.jpg)", 
      minHeight: "100vh", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "600px",
        background: "rgba(255, 255, 255, 0.15)", 
        borderRadius: "15px", 
        padding: "30px", 
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.3)"
      }}>
        <h1 style={{
          color: "white", 
          textAlign: "center", 
          marginBottom: "20px",
          fontSize: "2.2rem",
          textShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>Create Your Account</h1>
        <p style={{
          color: "white", 
          textAlign: "center", 
          marginBottom: "30px",
          opacity: "0.9"
        }}>Sign up to access all features</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: "15px"}}>
            <label style={{
              display: "block", 
              color: "white", 
              marginBottom: "5px",
              fontWeight: "500"
            }}>Username</label>
            <input 
              type="text" 
              id="username" 
              value={user.username}
              onChange={handleChange}
              placeholder="Choose a username"
              style={{
                width: "100%", 
                padding: "12px", 
                borderRadius: "8px", 
                background: "rgba(255, 255, 255, 0.15)", 
                color: "white", 
                border: errors.username ? "1px solid #ff6b6b" : "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                fontSize: "16px"
              }}
            />
            {errors.username && <div style={{color: "#ff6b6b", fontSize: "14px", marginTop: "5px"}}>{errors.username}</div>}
          </div>
          
          <div style={{display: "flex", gap: "15px", marginBottom: "15px"}}>
            <div style={{flex: 1}}>
              <label style={{
                display: "block", 
                color: "white", 
                marginBottom: "5px",
                fontWeight: "500"
              }}>First Name</label>
              <input 
                type="text" 
                id="firstName" 
                value={user.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                style={{
                  width: "100%", 
                  padding: "12px", 
                  borderRadius: "8px", 
                  background: "rgba(255, 255, 255, 0.15)", 
                  color: "white", 
                  border: errors.firstName ? "1px solid #ff6b6b" : "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  fontSize: "16px"
                }}
              />
              {errors.firstName && <div style={{color: "#ff6b6b", fontSize: "14px", marginTop: "5px"}}>{errors.firstName}</div>}
            </div>
            
            <div style={{flex: 1}}>
              <label style={{
                display: "block", 
                color: "white", 
                marginBottom: "5px",
                fontWeight: "500"
              }}>Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                value={user.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                style={{
                  width: "100%", 
                  padding: "12px", 
                  borderRadius: "8px", 
                  background: "rgba(255, 255, 255, 0.15)", 
                  color: "white", 
                  border: errors.lastName ? "1px solid #ff6b6b" : "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  fontSize: "16px"
                }}
              />
              {errors.lastName && <div style={{color: "#ff6b6b", fontSize: "14px", marginTop: "5px"}}>{errors.lastName}</div>}
            </div>
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{
              display: "block", 
              color: "white", 
              marginBottom: "5px",
              fontWeight: "500"
            }}>Email</label>
            <input 
              type="email" 
              id="email" 
              value={user.email}
              onChange={handleChange}
              placeholder="Your email address"
              style={{
                width: "100%", 
                padding: "12px", 
                borderRadius: "8px", 
                background: "rgba(255, 255, 255, 0.15)", 
                color: "white", 
                border: errors.email ? "1px solid #ff6b6b" : "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                fontSize: "16px"
              }}
            />
            {errors.email && <div style={{color: "#ff6b6b", fontSize: "14px", marginTop: "5px"}}>{errors.email}</div>}
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{
              display: "block", 
              color: "white", 
              marginBottom: "5px",
              fontWeight: "500"
            }}>Password</label>
            <input 
              type="password" 
              id="password" 
              value={user.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              style={{
                width: "100%", 
                padding: "12px", 
                borderRadius: "8px", 
                background: "rgba(255, 255, 255, 0.15)", 
                color: "white", 
                border: errors.password ? "1px solid #ff6b6b" : "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                fontSize: "16px"
              }}
            />
            {errors.password && <div style={{color: "#ff6b6b", fontSize: "14px", marginTop: "5px"}}>{errors.password}</div>}
          </div>
          
          <div style={{marginBottom: "25px"}}>
            <label style={{
              display: "block", 
              color: "white", 
              marginBottom: "5px",
              fontWeight: "500"
            }}>Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              style={{
                width: "100%", 
                padding: "12px", 
                borderRadius: "8px", 
                background: "rgba(255, 255, 255, 0.15)", 
                color: "white", 
                border: errors.confirmPassword ? "1px solid #ff6b6b" : "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                fontSize: "16px"
              }}
            />
            {errors.confirmPassword && <div style={{color: "#ff6b6b", fontSize: "14px", marginTop: "5px"}}>{errors.confirmPassword}</div>}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: "40px", 
              fontSize: "18px",
              border: "none", 
              background: "linear-gradient(135deg, rgba(79,172,254,0.8) 0%, rgba(0,242,254,0.5) 100%)",
              color: "white",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              marginBottom: "15px",
              transition: "all 0.3s ease",
              opacity: isLoading ? "0.7" : "1"
            }}
          >
            {isLoading ? "Creating Account..." : "Register Now"}
          </button>
          
          <div style={{
            textAlign: "center", 
            color: "white", 
            fontWeight: "500",
            marginTop: "20px"
          }}>
            Already have an account? 
            <Link 
              to="/login" 
              style={{
                color: "#4facfe",
                marginLeft: "8px",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;