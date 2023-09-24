import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {Form, Button, Accordion, Table} from "react-bootstrap";
import logo from "../assets/logo.svg";
import iconDelete from "../assets/error-fill.svg";

const RegisterIntegrated = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup/complete")
  }

  const initialFields = [
    { label: "사업자 등록증 첨부", file: null },
    { label: "입금 계좌 사본", file: null },
    { label: "대표자 신분증 사본", file: null },
    // { label: "PG 서비스 신청서", file: null, type: "half" },
  ];

  const companyInfoData = [
    {head: "업체명",  body: "김다솜11_shtest"},
    {head: "사업자번호",  body: "20220923"},
    {head: "대표자명",  body: "김다솜"},
    {head: "대표자 전화번호",  body: "010.****.1130"},
    {head: "사업장 주소",  body: "(06158) 서울특별시 강남구 테헤란로 79길 11-1(삼성동) 5층"},
    {head: "업종",  body: "전자상거래"},
    {head: "과세 종류",  body: "일반 과세"},
  ];

  const managerInfoData = [
    {head: "상점 담당자명",  body: "test"},
    {head: "상점 담당자 이메일",  body: "dasom.kim@sellerhub.co.kr"},
    {head: "상점 담당자 연락처",  body: "010.****.5678"},
    {head: "상점 담당자 휴대폰번호",  body: "010.****.1130"},
  ];

  const bankInfoData = [
    {head: "거래은행",  body: "신한은행(008)"},
    {head: "정산 계좌번호",  body: "110292****98"},
    {head: "예금주명",  body: "김다솜"},
  ];

  const [fields, setFields] = useState(initialFields);

  const [validated, setValidated] = useState(false);

  // 파일 선택 핸들러
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const newFields = [...fields];
    newFields[index].file = file;
    setFields(newFields);
  };

  // 파일 초기화 핸들러
  const handleFileReset = (index) => {
    const newFields = [...fields];
    newFields[index].file = null;
    setFields(newFields);
  };

  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    sms: false,
    email: false,
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

  return (
    <div className="page-container">
      <h1>
        <img src={logo} alt="" />
        빠른정산 회원가입
      </h1>

      <Form onSubmit={handleSubmit}>

        <div className="form-container">
          <h2>첨부 파일</h2>
          <div className="info-box alert">
            <ul>
              <li>확장자 “jpg, jpeg, png” 형식의 이미지 파일만 첨부 가능합니다.</li>
              <li>입금 계좌 사본 첨부 시 위 [정산]에 표기된 계좌정보의 [통장사본]을 첨부하여야 심사가 시작되요.</li>
              {/*<li>PG 서비스 신청서(개인)상의 인감은 통장사본에 인감이 날인된 경우는 서명으로 대체 불가하며, 통장사본에 서명을 하신 경우에만 서명으로 대체 가능합니다.</li>*/}
            </ul>
          </div>
          {fields.map((field, index) => (
            <Form.Group controlId={`attchFile${index}`} className={`attachment-form ${field.type}`} key={index}>
              <span className="label-title">{field.label}</span>
              <Form.Label>파일 선택</Form.Label>
              <Form.Control
                type="file"
                accept=",.jpg,.jpeg,.png"
                onChange={(event) => handleFileChange(event, index)}
                required
                name={`attchFile${index}`}
              />
              {field.file && (
                <div className="attachment">
                  {field.file.name}
                  <span className="delete" onClick={() => handleFileReset(index)}><img src={iconDelete} alt="첨부파일 삭데" /></span>
                </div>
              )}
            </Form.Group>
          ))}
          {/*<div className="download-area">*/}
          {/*  <a href="#" className="download-link" rel="noreferrer">신청서 양식 다운로드</a>*/}
          {/*</div>*/}
        </div>

        <hr />

        <Accordion defaultActiveKey="0" className="user-ref-data">
          <Accordion.Item eventKey="0">
            <Accordion.Header>업체 정보</Accordion.Header>
            <Accordion.Body>
              <Table striped borderless className="table-type-info">
                <tbody>
                {companyInfoData && companyInfoData.map((info, index) => (
                  <tr key={index}>
                    <th>{info.head}</th>
                    <td className="text-end">{info.body}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="user-ref-data">
          <Accordion.Item eventKey="0">
            <Accordion.Header>상점 담당자 정보</Accordion.Header>
            <Accordion.Body>
              <Table striped borderless className="table-type-info">
                <tbody>
                {managerInfoData && managerInfoData.map((info, index) => (
                  <tr key={index}>
                    <th>{info.head}</th>
                    <td className="text-end">{info.body}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
              <div className="info-box mt-4">
                <p>공급사 정보의 “영업 담당자 정보”가 “상점 담당자”로 지정되요.</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="user-ref-data">
          <Accordion.Item eventKey="0">
            <Accordion.Header>업체 정보</Accordion.Header>
            <Accordion.Body>
              <Table striped borderless className="table-type-info">
                <tbody>
                {bankInfoData && bankInfoData.map((info, index) => (
                  <tr key={index}>
                    <th>{info.head}</th>
                    <td className="text-end">{info.body}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="form-container">
          <h2>정보 수신 동의</h2>
          <div className="agree-check-area">
            <div className="check-all">
              <Form.Check
                type="checkbox"
                id="agreeAll"
                label="빠른정산 심사 및 진행 정보 수신을 위해 전체 동의합니다."
                name="agree_check_all"
                checked={allAgreed}
                onChange={handleAllAgreementChange}
              />
            </div>
            <ul className="check-list">
              <li>
                <Form.Check
                  type="checkbox"
                  id="agree1"
                  name="sms"
                  label="SMS"
                  checked={agreements.sms}
                  onChange={handleAgreementChange}
                  required
                />
              </li>
              <li>
                <Form.Check
                  type="checkbox"
                  id="agree1"
                  name="email"
                  label="이메일"
                  checked={agreements.email}
                  onChange={handleAgreementChange}
                  required
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-submit-area">
          <Button variant="primary" type="submit">
            통합 회원가입
          </Button>
        </div>
      </Form>

    </div>
  )
}

export { RegisterIntegrated }