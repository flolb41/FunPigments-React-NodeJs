import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  DateField,
} from "react-admin";

interface Props {
  basePath: "/colomatos/";
  dataProvider: any;
}

export const DefisList: any = (props: Props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="_id" />
      <TextField source="name" />
      <ImageField source="photo" />
      <TextField source="content" />
      <DateField source="start-at" />
      <DateField source="stop-at" />
      <TextField source="url" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);
