import useInfinityScroll from 'hooks/useInfinityScroll';
import { useContext } from 'react';
import { IssueContextProviderTemp } from 'contexts/issueContextTempForIssueList';
import { styled } from 'styled-components';
import AdvertisementItem from 'components/Advertisement';
import IssuesList from 'components/IssuesList';

export default function IssueListPage() {
  const { issues, fetchIssues, isLoading, isError } = useContext(
    IssueContextProviderTemp
  );

  const observeRef = useInfinityScroll({ callback: getIssuesCallback });

  function getIssuesCallback() {
    if (!isLoading) {
      return fetchIssues().catch(error => {
        console.error('Error fetching issues:', error);
      });
    }
    return Promise.resolve(); // Always return a promise
  }

  const issueElements = issues.map((list, idx) => (
    <li key={list.id}>
      <IssuesList list={list} key={list.id} />
      {hasAdvertisement(idx) && <AdvertisementItem />}
    </li>
  ));

  return (
    <ul>
      {issueElements}
      {isLoading && <>loading..</>}
      {isError ? <>error가 발생하였습니다.</> : <ObserveRef ref={observeRef} />}
    </ul>
  );
}
const ObserveRef = styled.li`
  height: 20px;
`;

function hasAdvertisement(idx: number) {
  return (idx + 1) % 5 === 0;
}