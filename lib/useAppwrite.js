import { useState, useEffect } from "react"

// custom hook to fetch data from appwrite server

const useAppWrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        // initially data needs to be loaded
        setIsLoading(true);



        try {

            const response = await fn();

            setData(response);

        } catch (error) {

            console.log(error)
            Alert.alert('Error', error)
        } finally {

            // regardless of failure or success, the loading has finished
            isLoading(false)
        }
    }

    useEffect(() => {        
        fetchData()
    }, []) // dependency array is empty so only fetch at start

    // console.log('data:', data)

    const refetch=()=>fetchData();

    return {data, isLoading, refetch}
}

export  default useAppWrite