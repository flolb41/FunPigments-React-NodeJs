import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  BooleanField,
  DateField,
  NumberField,
} from "react-admin";

interface Props {
  basePath: "/colomatos/";
  dataProvider: any;
}

export const ColomatosList: any = (props: Props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="_id" />
        <TextField source="name" />
        <ImageField source="photo" />
        <TextField source="brand" />
        <TextField source="color" />
        <NumberField source="quantity" />
        <TextField source="youtube-url" />
        <TextField source="amazon-url" />    
        <DateField source="created_at" />
        <DateField source="updated_at" />
        <BooleanField source="prod-type" />
    </Datagrid>
  </List>
);
