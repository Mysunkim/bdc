interface Props {
  params: {
    id: string;
  };
}

// 카드 데이터 정의 (예: cardData.js 또는 같은 파일에)
const cardData = [
  {
    id: '1',
    title: 'Card Title 1',
    content: 'This is the content of the card 1.',
    imageSrc: '/image/icon1.png',
  },
  {
    id: '2',
    title: 'Card Title 2',
    content: 'This is the content of the card 2.',
    imageSrc: '/image/icon2.png',
  },
  {
    id: '3',
    title: 'Card Title 3',
    content: 'This is the content of the card 3.',
    imageSrc: '/image/icon3.png',
  },
];
const GalleryDetail = ({ params }: Props) => {
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>; // ID가 없을 때 처리
  }
  // ID에 해당하는 카드 데이터를 찾음
  const card = cardData.find((card) => card.id === id);
  return (
    <div>
      <div>
        <h1>Gallery Detail for ID: {id}</h1>
        <h2>{card!.title}</h2> {/* '!'를 사용하여 card가 반드시 존재한다고 명시 */}
        <p>{card!.content}</p>
        <img src={card!.imageSrc} alt={card!.title} />
      </div>
    </div>
  );
};

export default GalleryDetail;