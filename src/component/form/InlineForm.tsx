import { InlineFormProps } from '../../types/common/props/form/FormProps.ts';

const InlineForm = ({ width, children }: InlineFormProps) => {
  return (
    <div className="d-inline-block" style={{ width: `${width}px` }}>
      {children}
    </div>
  );
};

export default InlineForm;
