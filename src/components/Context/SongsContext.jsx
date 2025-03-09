import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../Constant/constants";
import axios from "axios";

const SongsContext = createContext();


export const SongsProvider = ({ children }) => {

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/songs/allSongs`);
                setSongs(response.data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    return (
        <SongsContext.Provider value={{ songs, loading }}>
            {children}
        </SongsContext.Provider>
    );
};

export const useSongs = () => {
    return useContext(SongsContext);
};
