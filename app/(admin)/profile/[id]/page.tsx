'use client';

// Next
import { useParams } from 'next/navigation';
const page = () => {
    const params = useParams()

    const { id } = params;

    return (
        <div>
            <h1>Profile Page</h1>
            <p>User ID: {id}</p>
        </div>
    );
}

export default page;
