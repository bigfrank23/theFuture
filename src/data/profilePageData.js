import { v4 as uuidv4 } from "uuid";
import profileImg from '../images/user.png'
import dummyImg from '../images/house.jpg'
import dummyImg2 from '../images/mount.jpg'
import dummyImg3 from '../images/sea.jpg'
import dummyImg4 from '../images/unavail.jpg'
import dummyImg5 from '../images/img2.jpg'
import dummyImg6 from '../images/img7.jpg'
import dummyImg7 from '../images/img8.jpg'
import dummyImg8 from '../images/inspiration1.jpg'
import dummyImg9 from '../images/inspiration2.jpg'
import dummyImg10 from '../images/movie1.jpg'
import dummyImg11 from '../images/movie5.jpg'
import dummyImg12 from '../images/marten-bjork-n_IKQDCyrG0-unsplash.jpg'
import dummyImg13 from '../images/music1.jpg'
import RepeatIcon from '@mui/icons-material/Repeat';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
export const items = [
    {
        id: uuidv4(),
        repost: 'You reposted this',
        icon: [RepeatIcon, ThumbUpOutlinedIcon],
        author: 'John Doe',
        img: dummyImg,
        profileImg: profileImg,
        date: 'Aug 6',
        title: 'This is a sample title',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos nobis perspiciatis fugiat eaque odit ex iste laudantium dolore, aliquid numquam laborum repudiandae quia maiores cum explicabo quas nam reiciendis quis.',
    },
    {
        id: uuidv4(),
        post: 'You posted this',
        icon: [RepeatIcon, ThumbUpOutlinedIcon],
        author: 'John Doe',
        img: dummyImg,
        profileImg: profileImg,
        date: 'Aug 6',
        title: 'This is a sample title',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos nobis perspiciatis fugiat eaque odit ex iste laudantium dolore, aliquid numquam laborum repudiandae quia maiores cum explicabo quas nam reiciendis quis.',
    },
    {
        id: uuidv4(),
        liked: 'You liked this',
        icon: [RepeatIcon, ThumbUpOutlinedIcon],
        author: 'John Doe',
        img: dummyImg,
        profileImg: profileImg,
        date: 'Aug 6',
        title: 'This is a sample title',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos nobis perspiciatis fugiat eaque odit ex iste laudantium dolore, aliquid numquam laborum repudiandae quia maiores cum explicabo quas nam reiciendis quis.',
    },
];

export const photos = [
  { src: dummyImg, width: 600, height: 400 },
  { src: dummyImg3, width: 300, height: 200 },
  { src: dummyImg2, width: 300, height: 300 },
  { src: dummyImg4, width: 500, height: 700 },
  { src: dummyImg5, width: 550, height: 300 },
  { src: dummyImg6, width: 350, height: 300 },
  { src: dummyImg7, width: 400, height: 250 },
  { src: dummyImg8, width: 500, height: 400 },
  { src: dummyImg9, width: 300, height: 550 },
  { src: dummyImg10, width: 400, height: 600 },
  { src: dummyImg11, width: 600, height: 680 },
  { src: dummyImg12, width: 580, height: 430 },
  { src: dummyImg13, width: 700, height: 700 },
];
