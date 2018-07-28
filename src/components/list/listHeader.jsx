import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import _ from 'lodash';

const ListHeader = ({ selectedItems, deleteChip }) => {
    return (
        <div>
            { selectedItems && selectedItems.length > 0 &&
            <Stepper nonLinear activeStep={selectedItems.length - 1}>
                {selectedItems.map((item, index) => {
                    return (
                        <Step key={item.name}>
                            <StepButton onClick={() => deleteChip(item, index)}>
                                {_.startCase(_.toLower(item.name))}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            }
        </div>
    )

}

export default ListHeader;