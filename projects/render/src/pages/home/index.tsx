import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

export default () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>欢迎使用</div>
    </PageContainer>
  );
};
