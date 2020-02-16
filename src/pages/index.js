import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Section, Container, Table, Field, Label, Control, Title, Button, Subtitle, Help } from "bloomer";
import "bulma/css/bulma.min.css";

const IndexPage = () => {
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  const [customers,        setCustomers]        = useState([]);
  const [disableTxtEmail,  setDisableTxtEmail]  = useState(false);
  const [disableBtnAdd,    setDisableBtnAdd]    = useState(false);
  const [disableBtnUpdate, setDisableBtnUpdate] = useState(true);
  const [disableBtnRemove, setDisableBtnRemove] = useState(true);
  const [lastUpdated,      setLastUpdated]      = useState('Loading...');

  useEffect(() => {
    getCustomers();    
  }, []);

  async function getCustomers() {
    const url    = 'https://funccrm.azurewebsites.net/api/getCustomers?code=lqJNKcb9GVhVhwNFkT9Xxl/6TwqCyuuTmhzqNNdCgnR8iQSBiMFLkw==';
    const result = await axios(url);
    console.log('result', result.data);
    setCustomers(result.data);
    setLastUpdated(new Date().toUTCString());
  }

  async function insertCustomer(data, e) {
    console.log('insertCustomer', data);
    const id          = data.txtEmail.trim();
    const email       = data.txtEmail.trim();
    const name        = data.txtName.trim();
    const mobile      = data.txtMobile.trim();
    const address     = data.txtAddress.trim();
    const product_ids = data.txtProductIDs.trim();
    const source      = data.ddSource.trim();    
    const created     = new Date().toUTCString();

    reset({
      txtEmail:      '',
      txtName:       '',
      txtMobile:     '',
      txtAddress:    '',
      txtProductIDs: ''
    });
    
    const url = `https://funccrm.azurewebsites.net/api/insertCustomer?code=caODt9/saABTSUsx0c52fxKLWHvznE1xeFaNXlLrhe2v4uCVS1mwBg==&id=${id}&email=${email}&name=${name}&mobile=${mobile}&address=${address}&product_ids=${product_ids}&source=${source}&created=${created}`;
    console.log('url', url);
    try {
      const result = await axios.post(url);
      getCustomers();
      console.log('result insertCustomer', result);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  }

  async function updateCustomer(data, e) {
    const id          = data.txtEmail.trim();
    const email       = data.txtEmail.trim();
    const name        = data.txtName.trim();
    const mobile      = data.txtMobile.trim();
    const address     = data.txtAddress.trim();
    const product_ids = data.txtProductIDs.trim();
    const source      = data.ddSource.trim();    
    const created     = new Date().toUTCString();
    
    const url = `https://funccrm.azurewebsites.net/api/updateCustomer?code=JdjKnsGTm/ItXpjf3rGdIym46sivS59slYNSSFrQ8mqPcvuyvof6bw==&id=${id}&email=${email}&name=${name}&mobile=${mobile}&address=${address}&product_ids=${product_ids}&source=${source}&created=${created}`;
    console.log('url', url);
    try {
      const result = await axios.put(url);
      getCustomers();
      console.log('result updateFreelancer', result);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  }

  async function removeCustomer(data, e) {}

  function renderColumnNames() {
    return (
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Product ID (s)</th>
          <th>Source</th>
          <th>Created Date</th>
        </tr>
      </thead>
    );
  }

  function renderColumnData() {
    if (customers.length === 0) { 
      console.log('empty customers array', customers);
      return null;
    }

    let trHTMLs = [];
    console.log('renderColumnData customers', customers);
    customers.forEach(function(customer, index) {
      trHTMLs.push(
        <tr key={index}>
          <td>{customer.email}</td>
          <td>{customer.name}</td>
          <td>{customer.mobile}</td>
          <td>{customer.address}</td>
          <td>{customer.product_ids}</td>
          <td>{customer.source}</td>
          <td>{customer.created}</td>
        </tr>
      );      
    });
    
    return <tbody>{trHTMLs}</tbody>;
  }

  function toggleActiveRow(e) {
    // ignore table header, why would we want to select table header anyways :)
    if (e.target.parentNode.parentNode.tagName === 'THEAD') return;
    
    // we only allow one active row
    // if target not selected yet, find and remove all other selected, then just toggle the target
    // if target already selected, just toggle the target
    var klass_name = 'is-selected';
    if (e.target.parentNode.classList.contains(klass_name) === false) {
      document.getElementById('tblCustomers').querySelectorAll(`tr.${klass_name}`)
        .forEach(function(e) { e.classList.remove(klass_name); });      
    }
    e.target.parentNode.classList.toggle(klass_name);
    resetOrFillForm();    

    function resetOrFillForm() {
      if (e.target.parentNode.classList.contains(klass_name) === false) {
        setDisableTxtEmail(false);
        setDisableBtnAdd(false);
        setDisableBtnUpdate(true);
        setDisableBtnRemove(true); 
        reset({
          txtEmail:      '',
          txtName:       '',
          txtMobile:     '',
          txtAddress:    '',
          txtProductIDs: ''
        });
      } else {
        setDisableTxtEmail(true);
        setDisableBtnAdd(true);
        setDisableBtnUpdate(false);
        setDisableBtnRemove(false);
        Array.from(e.target.parentNode.children).forEach(function (td, index) {          
          switch (index) {
            case 0: setValue('txtEmail',      td.innerText); break;
            case 1: setValue('txtName',       td.innerText); break;
            case 2: setValue('txtMobile',     td.innerText); break;
            case 3: setValue('txtAddress',    td.innerText); break;
            case 4: setValue('txtProductIDs', td.innerText); break;
          }
        });
      }
    }
  }

  return (
    <Section>
      <Helmet title="Malaysian Customer 2020 Application (Demo Version)"></Helmet>
      <Container>
        <Title isSize={4}>New Customer Info</Title>
        <Field>
          <Label>Name</Label>
          <Control>
            <input name="txtName" className="input" type="text" style={{ width: '50%' }} ref={register({ required: true })} />            
          </Control>
          { errors.txtName && <Help isColor='danger'>This field is required</Help> }
        </Field>
        <Field>
          <Label>Email</Label>
          <Control>
            <input name="txtEmail" className="input" type="email" style={{ width: '50%' }} disabled={disableTxtEmail} ref={register({ required: true })} />            
          </Control>
          { errors.txtEmail && <Help isColor='danger'>This field is required</Help> }
          {/* <Help isColor='danger'>This email is already registered</Help> */}
        </Field>
        <Field>
          <Label>Mobile</Label>
          <Control>
            <input name="txtMobile" className="input" type="tel" style={{ width: '50%' }} ref={register({ required: true })} />            
          </Control>
          { errors.txtMobile && <Help isColor='danger'>This field is required</Help> }
        </Field>
        <Field>
          <Label>Address</Label>
          <Control>
            <input name="txtAddress" className="input" type="text" style={{ width: '50%' }} ref={register({ required: true })} />
          </Control>
          { errors.txtAddress && <Help isColor='danger'>This field is required</Help> }
        </Field>
        <Field>
          <Label>Product ID (s)</Label>
          <Control>
            <input name="txtProductIDs" className="input" type="text" style={{ width: '50%' }} ref={register({ required: true })} />            
          </Control>
          { errors.txtProductIDs && <Help isColor='danger'>This field is required</Help> }
        </Field>
        <Field>
          <Label>Source</Label>
          <Control>
            <div className="select">
              <select name="ddSource" ref={register({ required: true })}>
                <option value="Desktop">Desktop</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>            
          </Control>          
        </Field>

        <br />
        <div className="buttons">
          <Button id="btnAdd"    isColor="primary" isOutlined onClick={ handleSubmit(insertCustomer) } disabled={ disableBtnAdd    }>Add</Button>
          <Button id="btnUpdate" isColor="primary" isOutlined onClick={ handleSubmit(updateCustomer) } disabled={ disableBtnUpdate }>Update</Button>
          <Button id="btnDelete" isColor="danger"  isOutlined onClick={ handleSubmit(removeCustomer) } disabled={ disableBtnRemove }>Remove</Button>
        </div>
        <Title isSize={4} isDisplay="inline"  style={{ marginRight:'20px' }}>List of Customers</Title>
        <Button isSize="small" onClick={ getCustomers }>Refresh</Button>
        <Subtitle isSize={6}>Last Updated: { lastUpdated }</Subtitle>
        <Table id="tblCustomers" isStriped isNarrow className="is-hoverable" onClick={ toggleActiveRow }>
          { renderColumnNames() }
          { renderColumnData()  }
        </Table>
      </Container>
    </Section>
  );
};

export default IndexPage;
