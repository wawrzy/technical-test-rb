// @flow

import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import './URadioGroup.css';

type Props = {
  values: Array<string>,
  defaultValue: ?string,
  onChange: Function,
};

type State = {
  value: string,
};

class URadioGroup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { values, defaultValue } = this.props;

    this.state = {
      value: defaultValue || values[0],
    };
  }

  render() {
    const { values } = this.props;
    const { value } = this.state;

    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          value={value}
          onChange={this.handleChange}
          className="group"
        >
          {values.map(this.renderRadio)}
        </RadioGroup>
      </FormControl>
    );
  }

  renderRadio = (value: string) => (
    <FormControlLabel
      key={value}
      value={value}
      label={value}
      control={<Radio color="primary" />}
      labelPlacement="start"
    />
  );

  handleChange = (event: Object) => {
    const { onChange } = this.props;
    const { value } = event.target;

    this.setState({ value }, () => {
      if (onChange) onChange(value);
    });
  }
}

export default URadioGroup;
