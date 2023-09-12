import PropTypes from 'prop-types';

function EmailLink(props) {
  const email = ' catdog141000@gmail.com';
  const subject = '후원 신청합니다.';
  const body = `
  1. 기관/단체 정보:
    - 기관/단체 이름:
    - 연락처:
    - 주소:

  2. 후원 내용:
    - 후원 목적/목표:
    - 후원 금액 또는 물품:

  3. 홍보 및 인지도 향상 방안 (선택사항):
    - 홍보 계획 및 방법:

  4. 기타 사항 (선택사항):
    - 추가 정보 또는 요구사항:
  `;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <a
      className="px-2 py-1 rounded-2xl border-solid border-2 border-black text-xs font-bold"
      href={mailtoLink}
    >
      {props.text}
    </a>
  );
}

EmailLink.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmailLink;
