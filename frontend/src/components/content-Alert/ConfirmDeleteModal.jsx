import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../ui/Modal';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => (
    <Modal
        open={isOpen}
        onClose={onClose}
        title="ยืนยันการลบข้อมูล"
        size="sm:max-w-md"
        footer={
            <>
                <button type="button" onClick={onClose} className="btn-secondary">ยกเลิก</button>
                <button type="button" onClick={onConfirm} className="btn-danger"><TrashIcon />ยืนยันการลบ</button>
            </>
        }
    >
        <div className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="pt-2 text-sm text-slate-600">คุณแน่ใจหรือว่าต้องการลบข้อมูลนี้? ลบแล้วจะกู้คืนไม่ได้</p>
        </div>
    </Modal>
);

export default ConfirmDeleteModal;
