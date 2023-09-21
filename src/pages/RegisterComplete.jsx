import cong from "../assets/cong.svg"

const RegisterComplete = () => {
  return (
    <div className="complete-container">
      <div className="service-register-complete">
        <h1>관리자 승인 후 서비스 가입이 완료되요!</h1>
        <p>가입승인 시 입력하신 대표자 전화번호 및 이메일로 안내드릴게요. 잠시만 기다려주세요.</p>
        <div className="complete-visual"><img src={cong} alt="가입완료" /></div>
      </div>
    </div>
  )
}
export {RegisterComplete};