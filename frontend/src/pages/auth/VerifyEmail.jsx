import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Mail } from 'lucide-react';
import { authService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    }
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      const response = await authService.verifyEmail(token);
      setStatus('success');
      setMessage(response.data.message);
      toast.success('Email verified successfully!');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Email verification failed');
      toast.error('Email verification failed');
    }
  };

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <LoadingSpinner />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verifying your email...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {status === 'success' ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
          )}
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {status === 'success' ? 'Email Verified!' : 'Verification Failed'}
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>

          <div className="mt-6">
            {status === 'success' ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Redirecting to login page in 3 seconds...
                </p>
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Login Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/resend-verification"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Request New Verification Email
                </Link>
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 