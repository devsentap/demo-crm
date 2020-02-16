import React from "react";
import {
  Section, Container, Table, Field, Label, Control, Input,
  FieldLabel, Content, Title, Heading, Button, Select
} from "bloomer";
import 'bulma/css/bulma.min.css';

const IndexPage = () => {
  async function insertCustomer(name, email, mobile, address, source) {
    //const email = document.getElementById('txtEmail');
    // const url = `https://funcfreelancers.azurewebsites.net/api/insertFreelancer?code=lV3/AwrfLU/eDIo1m1zwfkFNKkNhU/2WzKVRQDh/3Nyi3LijJluPEg==&id=${id}&email=${email}&username=${username}&phone=${phone}&skills=${skills}&hobby=${hobby}`;
    // const result = await axios(url);
    // console.log('result', result);
    // setFreelancer(result.data);
  }

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
          <Label>Source</Label>
          <Control>
            <Select>
              <option>Desktop</option>
              <option>Mobile</option>
            </Select>
          </Control>          
        </Field>
        <div className="buttons">
          <Button id="btnAdd"    isColor="primary" isOutlined onClick={insertCustomer}>Add</Button>
          <Button id="btnUpdate" isColor="primary" isOutlined>Update</Button>
          <Button id="btnDelete" isColor="danger"  isOutlined isActive>Remove</Button>
        </div>
      </Container>
    </Section>
  );
};
// <Layout>
//   <SEO title="Home" />
//   <h1>Hi people Faiz</h1>
//   <p>Welcome to your new Gatsby site.</p>
//   <p>Now go build something great.</p>
//   <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//     <Image />
//   </div>
//   <Link to="/page-2/">Go to page 2</Link>
// </Layout>


export default IndexPage;
