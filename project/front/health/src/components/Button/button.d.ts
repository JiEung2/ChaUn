interface Primary {
    buttonStyle: {
      style: 'primary';
      size: 'large' | 'medium' | 'small' | 'tiny' | 'check' | 'select' ;
    };
  }
  
  interface SemiPrimary {
    buttonStyle: {
      style: 'semiPrimary';
      size: 'large';
    };
  }
  
  interface Outlined {
    buttonStyle: {
      style: 'outlined';
      size: 'semiTiny';
    };
  }
  
  interface SemiOutlined {
    buttonStyle: {
      style: 'semiOutlined';
      size: 'mini';
    };
  }
  
  interface Floating {
    buttonStyle: {
      style: 'floating';
      size: 'semiTiny';
    };
  }

  interface SemiFloating {
    buttonStyle: {
      style: 'semiFloating';
      size: 'tiny';
    };
  }

  
  
  type ButtonStyle = Primary | SemiPrimary | Outlined | SemiOutlined | Floating | SemiFloating;
  