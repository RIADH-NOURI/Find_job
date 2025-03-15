"use client"


import { AuthContext } from '../poviders/authProvider';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
