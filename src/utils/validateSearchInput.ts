
const  validateSearchInput = (input: string): string => {
    if (typeof input.trim() !== "string") {
        return "Search input must be a string";
      }

    if (!input.trim()) {
      return "Search input cannot be empty";
    }
    
    if (input.trim().length < 3) {
      return "Search input must be at least 3 characters long";
    }
    
    return "";
  }
  
  export default validateSearchInput
