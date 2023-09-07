import {
  Button,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback
} from "reactstrap"
import InputPassword from "@components/input-password-toggle"
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const ModalPassword = ({isOpen, toggle, onChange, chengPassword, passwords, passwordsMatch }) => {


  return (
    <Modal
    isOpen={isOpen}
    toggle={toggle}
    className="modal-dialog-centered"
  >
    <ModalHeader
      className="bg-transparent"
      toggle={toggle}
    ></ModalHeader>
    <ModalBody className="px-sm-5 mx-50 pb-4">
      <Form
        className="auth-reset-password-form"
        onSubmit={(event) => chengPassword(event)}
      >
        <div className="mb-1">
          <Label className="form-label" for="new-password">
            Новый пароль
          </Label>
          <InputPassword
            className="input-group-merge"
            id="new-password"
            name="newPassword"
            autoFocus
            value={passwords.newPassword}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <Label
            className="form-label"
            for="confirmPassword"
            name="confirmPassword"
          >
            Подтвердите пароль
          </Label>
          <InputPassword
            className="input-group-merge"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={onChange}
            invalid={!passwordsMatch && true}
          />
          {!passwordsMatch && (
            <FormFeedback>Введенные пароли не совпадают</FormFeedback>
          )}
        </div>

        <Button color="primary" block>
          Установить новый пароль
        </Button>
      </Form>
    </ModalBody>
  </Modal>
  )
}

export default ModalPassword