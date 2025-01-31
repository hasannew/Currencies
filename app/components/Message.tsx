import { useEffect } from 'react';
import styles from './styles/msg.module.css';
import { MsgProps } from '@/app/lib/types';
import settings from '@/config/settings';

const Msg: React.FC<MsgProps> = ({ message, type = 'info', duration = settings.msgDurarion, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.msg} ${styles[type]}`}>
      {message} 
    </div>
  );
};

export default Msg;
