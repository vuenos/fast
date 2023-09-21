import React from "react";
import {Link} from "react-router-dom";
import visual from "../assets/fast-visual.svg";
import shicon from "../assets/sellerhub-hexagon.svg";
import icoRocket from  "../assets/ico-recket.svg"
import icoDollar from  "../assets/ico-dollar.svg"
import logo from "../assets/logo.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Accordion, AccordionContext, Card, Form, useAccordionButton} from "react-bootstrap";
import {useContext, useState} from "react";

const Main = () => {
  const [modalShow, setModalShow] = useState(false);

  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
  });

  const handleAgreementChange = (event) => {
    const { name, checked } = event.target;

    setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
    const allChecked = Object.values({ ...agreements, [name]: checked }).every(
      (value) => value === true,
    );
    setAllAgreed(allChecked);
  };

  const handleAllAgreementChange = (event) => {
    const { checked } = event.target;
    setAgreements((prevAgreements) =>
      Object.keys(prevAgreements).reduce(
        (newAgreements, agreementKey) => ({
          ...newAgreements,
          [agreementKey]: checked,
        }),
        {}
      )
    );
    setAllAgreed(checked);
  };

  const isAllChecked = (agreements.agree1 && agreements.agree2) === true;
  const disabled = !isAllChecked;

  // eslint-disable-next-line react/prop-types
  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <button
        type="button"
        className={isCurrentEventKey ? "open" : "close"}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="main-container">
      <div className="main-section">
        <div className="gnb">
          <span className="logo"><img src={logo} height="40" alt="빠른정산" /></span>
          <Button className="btn primary" onClick={() => setModalShow(true)}>회원가입</Button>
        </div>

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              약관
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="info-box">
              <ul>
                <li>셀러허브에서 <strong>김다솜11_shtest</strong>님의 개인정보에 접근합니다.</li>
                <li>제공된 개인정보(이용자 식별, 통계, 계정 연동 및 CS 등을 위해 서비스 이용기간 동안 활용/보관 됩니다.)</li>
                <li>본 제공 동의를 거부할 권리가 있으나, 동의를 거부하실 경우 서비스 이용이 제한될 수 있습니다.</li>
                <li>약관 동의 시 <strong>업체명, 사업자번호, 대표자명, 대표자 전화번호, 사업장 주소, 업종, 과세 종류</strong> 정보를 가져옵니다.</li>
              </ul>
            </div>

            <div className="agreement-container">
              <div className="check-all">
                <Form.Check
                  type="checkbox"
                  id="agreeAll"
                  label="전체 동의하기"
                  name="agree_check_all"
                  checked={allAgreed}
                  onChange={handleAllAgreementChange}
                />
              </div>
              <Accordion>
                <Card>
                  <Card.Header className="custom-accor">
                    <Form.Check
                      type="checkbox"
                      id="agree1"
                      name="agree1"
                      label="빠른 정산 이용약관 동의"
                      checked={agreements.agree1}
                      onChange={handleAgreementChange}
                    />
                    <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I am the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header className="custom-accor">
                    <Form.Check
                      type="checkbox"
                      id="agree2"
                      name="agree2"
                      label="개인정보 취급방침 동의"
                      checked={agreements.agree2}
                      onChange={handleAgreementChange}
                    />
                    <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I am another body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* eslint-disable-next-line react/prop-types */}
            <Button variant="secondary" onClick={() => setModalShow(false)}>취소</Button>
            <Button variant="primary" disabled={disabled}>
              <Link to="/register">동의하기</Link>
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="main-contents">
          <div className="link">
            <sup>4일만에</sup>
            <h2>
              빠른 정산<br />
              서비스
            </h2>
            <Link to="/integration" className="btn primary large">
              <img src={shicon} alt="sellerhub logo" className="btn-icon" />
              셀러허브 통합 회원가입
            </Link>
            <button className="btn light large" onClick={() => setModalShow(true)}>회원가입</button>
          </div>

          <div className="visual">
            <img src={visual} alt="" />
          </div>
        </div>

        <div className="service-feature d-flex justify-content-between">
          <div className="box">
            <span className="icon"><img src={icoRocket} alt="" /></span>
            <h4>빠르다</h4>
            <p>4일만에 빠른 정산</p>
          </div>
          <div className="box">
            <span className="icon"><img src={icoDollar} alt="" /></span>
            <h4>비용 절감</h4>
            <p>100만원 신청 시 수수료 8천원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Main }