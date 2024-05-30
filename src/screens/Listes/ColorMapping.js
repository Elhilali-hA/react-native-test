const getColor = (colorKey) => {
    switch (colorKey) {
      case 'inverse':
        return 'hsl(24, 2%, 20%)'; // Replace with the actual color value
      case 'default':
        return 'hsl(24, 2%, 50%)'; // Replace with the actual color value
      case 'gray':
        return 'hsl(24, 2%, 35%)';
      case 'gold':
        return 'gold';
      case 'primary':
        return 'hsl(185, 44%, 28%)'; // Replace with the actual color value
      case 'info':
        return 'hsl(188, 60%, 40%)'; // Replace with the actual color value
      case 'success':
        return 'hsl(67, 100%, 30%)'; // Replace with the actual color value
      case 'warning':
        return 'hsl(28, 100%, 45%)'; // Replace with the actual color value
      case 'danger':
        return 'hsl(10, 100%, 40%)'; // Replace with the actual color value
      case 'purple':
        return 'hsl(264, 38%, 50%)'; // Replace with the actual color value
      case 'blue':
        return 'hsl(207, 44%, 38%)'; // Replace with the actual color value
      case 'pink':
        return 'hsl(330, 100%, 45%)'; // Replace with the actual color value
      case 'yellow':
        return 'hsl(42, 100%, 50%)'; // Replace with the actual color value
      case 'black':
        return '#000';
      case 'white':
        return '#FFF';
      default:
        return 'hsl(24, 2%, 50%)'; // Default color if key is not found
    }
  };
  
  export default getColor;
  