import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  // Sample images for the gallery (replace with actual image URLs)
  const images = [
    { id: 1, src: 'https://i0.wp.com/www.nrtec.in/wp-content/uploads/2023/06/DSC09054.jpg?fit=7952%2C5304&ssl=1', title: 'Alumni Meet for MBA' },
    { id: 2, src: 'https://www.nrtec.in/wp-content/uploads/2021/01/nec-aws-workshop.jpg', title: 'Workshop Session' },
    { id: 3, src: 'https://i0.wp.com/www.nrtec.in/wp-content/uploads/2020/01/Design-Technology-of-Cast-Resin-Transformers-4.jpg?fit=850%2C567&ssl=1', title: 'Guest Lecture' },
    { id: 4, src: 'https://www.nrtec.in/wp-content/uploads/2024/10/f3b34407-93c2-48d0-b250-9032bb37a91f.jpeg', title: 'Cultural Event' },
    { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLFB_FmRWNAoZNMcbFJML_RdVVJPYtld1dfsDKu51AqTMcdHGb7L0tD01FEliUp3pAbCc&usqp=CAU', title: 'Networking Event' },
    { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRghmjSyFpIQjJDCAlZY8RbGkjgoyEmX9_ijw&s', title: 'Panel Discussion' },
    { id: 7, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt118X8JI7m5lgKoG8Bi_iLKFdMNP13oZDnA&s', title: 'Ranking'},
    { id: 8, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Computer_Lab%2C_Narasaraopeta_Engineering_College.jpg',title: 'Labs'},
    { id: 9, src: 'https://i0.wp.com/www.nrtec.in/wp-content/uploads/2024/09/image005-scaled.jpg?resize=870%2C285&ssl=1',title:'NCC'},
    { id: 10, src:'https://i0.wp.com/www.nrtec.in/wp-content/uploads/2023/06/DJI_0403-scaled.jpg?fit=2560%2C1440&ssl=1',title:'Buses'},
    { id: 11, src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5q4g-D-cDhZDJLh4bjGz8bn4mQkUigRkdbw&s',title:'Events'},
    { id: 12, src:'https://i0.wp.com/www.nrtec.in/wp-content/uploads/2022/09/TEJ8242_resize-Copy.jpg?resize=1170%2C780&ssl=1',title:'Graduates'},
    { id: 13, src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjti0B5by68iIvGQEAn0NzBsxaRqvKhQOi2Up2WtjOfrMEk_EKMiM_znxQbsSUA9pRm9o&usqp=CAU',title:'Achivements'},
    { id:14, src:'https://www.nrtec.in/wp-content/uploads/2019/07/IndustrialVisit-Final-Year-2.jpg',title:'Industrial visits'},
    { id:15,src:'https://images.shiksha.com/mediadata/images/1684556273php26RTjS.jpeg',title:'Hostel'},
    { id:16,src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwkYDSZmitjmtJWrUQx0d3ijsIeG2vjoWaFA&s',title:'Ranks'},
    {id:17,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6lFGQKqqX55MqGxVuEpir0ZmU3fYpWbGatQ&s",title:'Gate'},
    {id:18,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfh7JUG7gpI3uXuyg_ORspweKfNIG_Glskeg&s",title:'Block3'},
    {id:19,src:"https://content.jdmagicbox.com/comp/guntur/25/9999pmulhydstd80225/catalogue/narasaraopeta-engineering-college-narasaraopet-engineering-colleges-1OWq8ymHSWR5RdD.jpg",title:'Block2'},
    {id:20,src:"https://media.collegedekho.com/media/img/institute/crawled_images/None/Screenshot_from_2024-07-22_10-43-19.png",title:'College'},

  
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Alumni Gallery</h1>
      <div className="gallery-grid">
        {images.map((image) => (
          <div className="gallery-item" key={image.id} onClick={() => openModal(image)}>
            <img src={image.src} alt={image.title} className="gallery-img" />
            <div className="gallery-overlay">
              <p className="gallery-text">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} className="modal-img" />
            <p className="modal-title">{selectedImage.title}</p>
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
         {/* Footer */}
         <footer className="footer">
        <p>
          © {new Date().getFullYear()} Narasaraopeta Engineering College. All
          rights reserved.
        </p>
        <p>Contact us at alumni@nec.edu.in</p>
      </footer>
    </div>
  );
};

export default Gallery;
