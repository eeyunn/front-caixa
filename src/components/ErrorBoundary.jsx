import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          marginTop: '10vh',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ color: '#e53e3e' }}>¡Vaya! Algo salió mal.</h1>
          <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
            Hemos detectado un error inesperado en el portal interdimensional.
          </p>
          <div style={{ 
            background: '#f7fafc', 
            padding: '1rem', 
            borderRadius: '8px', 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            overflow: 'auto',
            border: '1px solid #e2e8f0'
          }}>
             <code style={{ color: '#d53f8c' }}>{this.state.error?.toString()}</code>
          </div>
          <button 
            onClick={this.handleReload}
            style={{
              padding: '10px 20px',
              background: '#00b5cc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Recargar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
