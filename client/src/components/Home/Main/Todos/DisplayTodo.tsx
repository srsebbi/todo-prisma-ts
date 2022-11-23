import { Todo } from '../../../../types';
import styles from './todos.module.css';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo';
import { TodoInfo } from './TodoInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { UpdateTodoForm } from './UpdateTodo';
import { Modal } from '../../Modal';

export const DisplayTodo = ({
  todo,
  projectId,
}: {
  todo: Todo;
  projectId?: string;
}) => {
  const { mutate, isError, isLoading, error, isSuccess } = useDeleteTodo();
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      mutate(todo.id);
    } else {
      console.log('Cancelled');
    }
  };

  return (
    <li className={styles.todoCard}>
      {!isLoading ? (
        <div className={styles.todoInfoContainer}>
          <TodoInfo todo={todo} />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (modalOpen ? close() : open())}
          >
            update todo
          </motion.button>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {modalOpen && (
              <Modal handleClose={close}>
                <UpdateTodoForm todo={todo} projectId={projectId} />
              </Modal>
            )}
          </AnimatePresence>
          <motion.button
            onClick={handleDelete}
            whileHover={{
              scale: 1.1,
              boxShadow: '1px 1px 0 rgba(0, 0, 0, 0.2)',
            }}
            whileTap={{ scale: 0.9 }}
            className={styles.removeButton}
          >
            X
          </motion.button>
        </div>
      ) : (
        <p>Deleting</p>
      )}
    </li>
  );
};
