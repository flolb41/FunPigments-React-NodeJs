import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, DateField } from "react-admin";

interface Props {
  basePath: "/auth/";
  dataProvider: any;
}

export const UserList: any = (props: Props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="_id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="city" />
      <ImageField source="thumbnail" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <BooleanField source="is_admin" />
    </Datagrid>
  </List>
);

