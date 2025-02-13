import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBookStore } from '@/store/bookStore';

const ViewModel = () => {
    const { id } = useParams();
    const { getBookById } = useBookStore();
    const [bookDetails, setBookDetails] = useState<any>(null);

    useEffect(() => {
        if (id) {
            getBookById(id).then((response) => {
                if (response.success) {
                    setBookDetails(response.data);
                }
            });
        }
    }, [id, getBookById]);

    const slackDeepLink = 'exp+deer-and-book-pdf-reader:expo-development-client?url=http%3A%2F%2F192.168.1.128%3A8081';
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.Slack';

    const handleOpenSlackRoom = () => {
        const link = document.createElement('a');
        link.href = slackDeepLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 1000);
    };

    return {
        id,
        bookDetails,
        handleOpenSlackRoom,
    };
};

export default ViewModel;
