/**
 * FL Rental - Quote/Cart Context
 * Estado global para el carrito de cotización
 */

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';

// Tipos
export interface QuoteItem {
  id: number;
  name: string;
  image: string;
  price: string;
  category: string;
  quantity: number;
  days: number; // Días de arriendo
}

export interface CustomerInfo {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  rut: string;
  direccion: string;
  comuna: string;
  region: string;
  mensaje: string;
}

interface QuoteState {
  items: QuoteItem[];
  customerInfo: CustomerInfo;
  isCartOpen: boolean;
}

type QuoteAction =
  | { type: 'ADD_ITEM'; payload: Omit<QuoteItem, 'quantity' | 'days'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'UPDATE_DAYS'; payload: { id: number; days: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CUSTOMER_INFO'; payload: Partial<CustomerInfo> }
  | { type: 'TOGGLE_CART'; payload?: boolean }
  | { type: 'LOAD_CART'; payload: QuoteState };

const initialCustomerInfo: CustomerInfo = {
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  rut: '',
  direccion: '',
  comuna: '',
  region: '',
  mensaje: '',
};

const initialState: QuoteState = {
  items: [],
  customerInfo: initialCustomerInfo,
  isCartOpen: false,
};

// Reducer
function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existingIndex >= 0) {
        // Si ya existe, incrementar cantidad
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        return { ...state, items: newItems, isCartOpen: true };
      }
      // Si no existe, agregar nuevo item
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1, days: 1 }],
        isCartOpen: true,
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'UPDATE_DAYS': {
      const { id, days } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, days: Math.max(1, days) } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], customerInfo: initialCustomerInfo };

    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: { ...state.customerInfo, ...action.payload },
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: action.payload !== undefined ? action.payload : !state.isCartOpen,
      };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

// Context
const QuoteContext = createContext<{
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
  addItem: (item: Omit<QuoteItem, 'quantity' | 'days'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateDays: (id: number, days: number) => void;
  clearCart: () => void;
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  toggleCart: (open?: boolean) => void;
  totalItems: number;
  subtotal: number;
} | null>(null);

// Provider
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const savedCart = localStorage.getItem('flrental_quote');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: { ...parsed, isCartOpen: false } });
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('flrental_quote', JSON.stringify({
      items: state.items,
      customerInfo: state.customerInfo,
    }));
  }, [state.items, state.customerInfo]);

  // Helper functions
  const addItem = (item: Omit<QuoteItem, 'quantity' | 'days'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateDays = (id: number, days: number) => {
    dispatch({ type: 'UPDATE_DAYS', payload: { id, days } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setCustomerInfo = (info: Partial<CustomerInfo>) => {
    dispatch({ type: 'SET_CUSTOMER_INFO', payload: info });
  };

  const toggleCart = (open?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', payload: open });
  };

  // Calcular totales
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = state.items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * item.quantity * item.days;
  }, 0);

  return (
    <QuoteContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        updateDays,
        clearCart,
        setCustomerInfo,
        toggleCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

// Hook
export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
