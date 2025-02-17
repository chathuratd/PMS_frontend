
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

//components
import LeaderboardDetails from '../components/LeaderboardDetails';
import CircularProgress from '@mui/material/CircularProgress';

export const Leaderboard =() => {
    const [leader, setLeader] = useState(null) ;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); 
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.REACT_APP_API_PROXY;
    
    useEffect(() => {
        const fetchLeaderboard = async()=>{
            const response = await fetch(`${baseUrl}/api/leaderboard`) //fetching data from the backend and storing it in response
            const json = await response.json(); 
            if(response.ok){ 
                setLeader(json) 
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 1000); // Delay of 1000 milliseconds (1 second)
            
                return () => clearTimeout(timer);
            }
        }
        fetchLeaderboard();
    }, []);

    

    useEffect(() => {
        const filtered = leader?.filter(
            (item) => item && item.month && item.month.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
        setFilteredItems(filtered);
    }, [searchTerm, leader]);







    return(

        <div className="px-4 py-8 ml-auto">
               <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 ml-64"> 
            <h1 className="text-2xl font-semibold text-gray-800">Staff Leaderboard</h1>
            <div className="flex items-center">
                    <TextField
                        label="Search months..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700 field"
                    />
                </div> 
        </div>  
        <div className="ml-64 px-16">
        {loading ? (
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            ) :

      
            filteredItems.length > 0 ? (
                filteredItems.map((item) => (

                    item && <LeaderboardDetails key={item._id} leaderboard={item} />
                ))
            ) : (
                <p>No months Found</p>
            )}
         </div>
        </div>    
    );
};

export default Leaderboard;