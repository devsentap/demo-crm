import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Section, Container, Table, Field, Label, Control, Input,
  FieldLabel, Content, Title, Heading, Button, Select, Subtitle, Help
} from "bloomer";
import 'bulma/css/bulma.min.css';

const IndexPage = () => {
  const [customers,      setCustomers]      = useState([]);
  const [lastUpdated,    setLastUpdated]     = useState('Loading...');

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

  async function insertCustomer(name, email, mobile, address, product_id, source) {
    //const email = document.getElementById('txtEmail');
    // const url = `https://funcfreelancers.azurewebsites.net/api/insertFreelancer?code=lV3/AwrfLU/eDIo1m1zwfkFNKkNhU/2WzKVRQDh/3Nyi3LijJluPEg==&id=${id}&email=${email}&username=${username}&phone=${phone}&skills=${skills}&hobby=${hobby}`;
    // const result = await axios(url);
    // console.log('result', result);
    // setFreelancer(result.data);
  }

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

  function toggleActiveRow(e) {}

  return (
    <Section>
      <Container>
        <Title isSize={4}>New Customer Info</Title>
        <Field>
          <Label>Name</Label>
          <Control>
            <Input id="txtName" style={{ width: '50%' }}></Input>
          </Control>
        </Field>
        <Field>
          <Label>Email</Label>
          <Control>
            <Input id="txtEmail" style={{ width: '50%' }}></Input>
          </Control>
        </Field>
        <Field>
          <Label>Mobile</Label>
          <Control>
            <Input id="txtMobile" style={{ width: '50%' }}></Input>
          </Control>
        </Field>
        <Field>
          <Label>Address</Label>
          <Control>
            <Input id="txtAddress" style={{ width: '50%' }}></Input>
          </Control>
        </Field>
        <Field>
          <Label>Product ID (s)</Label>
          <Control>
            <Input id="txtProductIDs" style={{ width: '50%' }}></Input>
          </Control>
        </Field>
        <Field>
          <Label>Source</Label>
          <Control>
            <Select>
              <option>Desktop</option>
              <option>Mobile</option>
            </Select>
          </Control>          
        </Field>
        {/* <Field>
          <Label>Created On:</Label>
          <Control>
            <Input id="txtCreated" style={{ width: '50%' }}></Input>
          </Control>
        </Field> */}
        <br />
        <div className="buttons">
          <Button id="btnAdd"    isColor="primary" isOutlined onClick={insertCustomer}>Add</Button>
          <Button id="btnUpdate" isColor="primary" isOutlined>Update</Button>
          <Button id="btnDelete" isColor="danger"  isOutlined isActive>Remove</Button>
        </div>
        <Title isSize={4} isDisplay="inline"  style={{ marginRight:'20px' }}>List of Customers</Title>
        <Button isSize="small" onClick={getCustomers}>Refresh</Button>
        <Subtitle isSize={6}>Last Updated: {lastUpdated}</Subtitle>
        <Table id="tblCustomers" isStriped isNarrow className="is-hoverable" onClick={toggleActiveRow}>
          { renderColumnNames() }
          { renderColumnData() }
        </Table>
      </Container>
    </Section>
  );
};

export default IndexPage;
