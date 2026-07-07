export function useDate() {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    
    
    const month = date.getUTCMonth(); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const hoursStr = String(hours).padStart(2, '0');
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return `${monthNames[month]} ${day} ${year} ${hoursStr}:${minutes} ${ampm}`;
  };

  return {
    formatDate,
    formatDateTime
  };
}