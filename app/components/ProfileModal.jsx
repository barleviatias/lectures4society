import React from 'react';
import Image from 'next/image';

const ProfileModal = ({ data, onClose }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <Image src={data.pic} width={200} height={200} alt="avatar" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-4">{data.name}</h2>
          <p className="mt-2">{data.about_me}</p>
          {/* Add more profile details as needed */}
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;