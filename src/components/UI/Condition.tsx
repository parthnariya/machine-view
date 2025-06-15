import { Children, isValidElement } from 'react';

interface ConditionProps {
  children: React.ReactNode;
}

interface ConditionalBranchProps {
  condition: boolean;
  children: React.ReactNode;
}

interface ElseBranchProps {
  children: React.ReactNode;
}

const Condition = ({ children }: ConditionProps) => {
  let renderedChild: React.ReactNode = null;
  let conditionMet = false;

  Children.forEach(children, (child) => {
    if (!conditionMet) {
      if (
        isValidElement(child) &&
        (child.type === Condition.If || child.type === Condition.ElseIf)
      ) {
        const typedChildProps = child.props as ConditionalBranchProps;
        if (typedChildProps.condition) {
          renderedChild = child;
          conditionMet = true;
        }
      } else if (
        isValidElement(child) &&
        child.type === Condition.Else &&
        !conditionMet
      ) {
        renderedChild = child;
        conditionMet = true;
      }
    }
  });

  return renderedChild;
};

Condition.If = ({ children }: ConditionalBranchProps) => children;

Condition.ElseIf = ({ children }: ConditionalBranchProps) => children;

Condition.Else = ({ children }: ElseBranchProps) => children;

export default Condition;
