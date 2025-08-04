import {useRants} from '../rants/useRants';
import { use, useEffect } from 'react';

function RantSection() {
    const {rants, loading, error, fetchRants} = useRants();

    useEffect(() => {
        fetchRants();
    },[fetchRants])

    console.log("rants", rants);
    return (
        
        <section className="flex items-start justify-center md:items-start md:justify-center min-h-screen c-space">


        </section>
    )
}

export default RantSection;