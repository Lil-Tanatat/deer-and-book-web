import { Fragment, type FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconUser from '@/components/Icon/IconUser';
import IconMapPin from '@/components/Icon/IconMapPin';
import PlanItem from '../Components/PlanItem';
import IconCalendar from '@/components/Icon/IconCalendar';
import IconSearch from '@/components/Icon/IconSearch';
import { formatThaiDateNotime, formatThaiDateNoDay, formatThaiDateOnlyDay } from '@/utils/format-time';
import { formatNumberCommasNoDecimal } from '@/utils/format-number';

import useViewModel from './ViewModel';
import { useNavigate } from 'react-router-dom';

import { FaSearch, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

const BookDetailsView: FC = () => {
    const { id, bookDetails, handleOpenSlackRoom } = useViewModel();
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/home');
    };
    const navigateToShare = (slug: string) => {
        window.open(`https://deerandbook.com/book/${slug}`, '_blank');
    };

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <Fragment>
            <div className="min-h-screen flex flex-col lg:hidden bg-gradient-to-b from-[#B347FD] to-[#6789EE] items-center justify-center overflow-scroll">
                {/* Header */}
                <div className="w-full p-5 flex justify-between items-center">
                    <img style={{ height: 20, width: 20 }} className="cursor-pointer" src="/assets/images/icon/close-button-icon.png" alt="close-button-icon" onClick={() => navigateToHome()}></img>
                    <h2 className="text-white font-semibold text-lg">Book Detail</h2>
                    <img style={{ height: 20, width: 20 }} className="cursor-pointer" src="/assets/images/icon/share-icon.png" alt="share-icon" onClick={() => navigateToShare(bookDetails.slug)}></img>
                </div>
                {/* Modal Container */}
                <div className="bg-white w-auto mx-4 max-w-md rounded-2xl mb-5">
                    {/* Content */}
                    <div className="p-6">
                        {/* Book Image */}
                        <div className="flex justify-center">
                            <img src={`https://deerandbook.com/${bookDetails.cover_image}`} alt="Book Cover" className="w-40 h-56 object-cover rounded-lg" />
                        </div>

                        {/* Title and Author */}
                        <h3 className="text-center text-lg font-bold mt-4 bg-gradient-to-l from-[#7B77F2] to-[#B446FF] bg-clip-text text-transparent">{bookDetails.book_name}</h3>
                        <p className="text-center font-semi-bold text-[#B1B1B1]">Author by {bookDetails.author_name}</p>

                        {/* Category Tag */}
                        <div className="flex justify-start mt-2">
                            <span
                                className="px-4 py-1 text-xs font-semibold text-[#864CFC] bg-[#E5D4FD] rounded-md"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(123, 119, 242, 0.3) 0%, rgba(126, 116, 242, 0.3) 48.99%, rgba(181, 69, 255, 0.3) 100%)',
                                }}
                            >
                                # {bookDetails.book_category_name}
                            </span>
                        </div>

                        {/* Book Overview */}
                        <h4 className="text-black font-bold mt-6">Book Overview</h4>
                        <p className="text-[#979797] text-sm mt-2 font-semibold">{bookDetails.description}</p>

                        {/* Book Info */}
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div>
                                <p className="font-semibold bg-gradient-to-l from-[#AB4EFD] to-[#7B77F2] bg-clip-text text-transparent">Publisher</p>
                                <p className="text-[#979797] font-medium">{bookDetails.author_name}</p>
                            </div>
                            <div>
                                <p className="font-semibold bg-gradient-to-l from-[#AB4EFD] to-[#7B77F2] bg-clip-text text-transparent">Page</p>
                                <p className="text-[#979797] font-medium">{bookDetails.pages}</p>
                            </div>
                            <div>
                                <p className="font-semibold bg-gradient-to-l from-[#AB4EFD] to-[#7B77F2] bg-clip-text text-transparent">Update</p>
                                <p className="text-[#979797] font-medium">{formatDate(bookDetails.update_date)}</p>
                            </div>
                            <div>
                                <p className="font-semibold bg-gradient-to-l from-[#AB4EFD] to-[#7B77F2] bg-clip-text text-transparent">Release date</p>
                                <p className="text-[#979797] font-medium">{formatDate(bookDetails.release_date)}</p>
                            </div>
                            <div>
                                <p className="font-semibold bg-gradient-to-l from-[#AB4EFD] to-[#7B77F2] bg-clip-text text-transparent">File size</p>
                                <p className="text-[#979797] font-medium">{bookDetails.file_size} MB.</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-10 mb-4">
                            {/* Watch Video */}
                            <button className="flex items-center space-x-2 text-[#864CFC] font-semibold">
                                <img style={{ height: 20, width: 20 }} className="cursor-pointer" src="/assets/images/icon/play-button-icon.png" alt="play-button-icon"></img>
                                <span>Watch Video</span>
                            </button>

                            {/* Read Button */}
                            <button className="px-6 py-2 bg-gradient-to-r from-[#B347FD] to-[#7B77F2] text-white font-bold rounded-full shadow-lg" onClick={() => handleOpenSlackRoom()}>
                                Read
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BookDetailsView;
