export const flip_card_inner: any = {
  position: 'relative',
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
};

export const flip_card_front: any = {
  transform: 'rotateY(0deg)',
  backfaceVisibility: 'hidden',
};

export const flip_card_back: any = {
  backgroundColor: 'transparent',
  color: 'white',
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)'
};

export const card_header: any = {
  width: '96%',
  background: 'rgba(0, 0, 0, 0.35)',
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: '5px',
  paddingTop: '5px',
};

export const card_back_header: any = {
  ...card_header,
  position: 'absolute',
  top: '-260px'
};

export const card_body: any = {
  display: 'flex',
  height: '50%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
};

export const card_footer: any = {
  display: "flex",
  justifyContent: "center",
  alignItems: 'center',
  width: "92%",
  height: "30px",
  marginTop: '35px'
};

export const flag: any = {
  width: "25px",
  border: '1px solid #777',
  borderRadius: '5px',
  padding: '0px'
};

export const emoji: any = {
  width: "15px",
  margin: "0px 8px 5px 8px",
};

export const country_name: any = {
  whiteSpace: "nowrap", 
  overflow: "hidden", 
  textOverflow: "ellipsis",
  fontSize: '16px'
};

export const button: any = {
  position: 'absolute',
  right: '-25px',
  width: '30px',
  borderRadius: '7px',
  backgroundColor: '#ffefd5',
  cursor: 'pointer',
  border: '1px solid #909090'
};

export const rotate_button: any = {
  ...button,
  top: '80px',
  height: '30px',
};

export const rotate_icon: any = {
  width: '30px',
  marginTop: '1.5px',
  marginLeft: '-6px',
  cursor: 'pointer',
};

export const bookmarking_button: any = {
  ...button,
  top: '40px',
  height: '34px',
};
 
export const bookmark_icon: any = {
  width: '17px',
  marginRight: '10px',
  marginTop: '5px',
};
