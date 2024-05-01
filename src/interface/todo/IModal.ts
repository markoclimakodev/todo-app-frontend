export interface ModalProps  {
    openModal: boolean,
    closeModal: () => void
    id?: string
    userId?: string
    modalType: 'create' | 'update'
}
