<?php

namespace AppBundle\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository;

/**
 * ArticleRepository
 */
class ArticleRepository extends DocumentRepository
{
    /**
     * @param null $category
     * @param int $limit
     * @param \DateTime $date
     * @return array
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function findAllSorted($category = null, $limit = 3, \DateTime $date = null)
    {
        $query = $this->createQueryBuilder();
        if ($category) {
            $query->field('category.title')->equals($category);
        }

        if ($date) {
            $dayStart = clone($date);
            $mongoDateStart = new \MongoDate($dayStart->getTimestamp());
            $dayEnd = $dayStart->add(new \DateInterval("PT24H"));
            $mongoDateEnd = new \MongoDate($dayEnd->getTimestamp());

            $query->field('pubDate')->gt($mongoDateStart)
                ->field('pubDate')->lt($mongoDateEnd);
        }

        $query->sort('pubDate', 'desc')
            ->limit($limit)
        ;

        return $query->getQuery()->execute()->toArray();
    }

    /**
     * @param $source
     * @param int $limit
     * @param \DateTime $date
     * @return array
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function findBySource($source, $limit = 3, \DateTime $date = null)
    {
        $query = $this->createQueryBuilder()
            ->field('source.title')->equals($source);

        if ($date) {
            $dayStart = clone($date);
            $mongoDateStart = new \MongoDate($dayStart->getTimestamp());
            $dayEnd = $dayStart->add(new \DateInterval("PT24H"));
            $mongoDateEnd = new \MongoDate($dayEnd->getTimestamp());

            $query->field('pubDate')->gt($mongoDateStart)
                ->field('pubDate')->lt($mongoDateEnd);
        }

        $query->sort('pubDate', 'desc')
            ->limit($limit)
        ;

        return $query->getQuery()->execute()->toArray();
    }

    /**
     * @param $title
     * @param int $limit
     * @param \DateTime $date
     * @return array
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function findByTitle($title, $limit = 3, \DateTime $date = null)
    {
        $query = $this->createQueryBuilder()
            ->field('title')->equals(new \MongoRegex('/.*'.$title.'.*/i'));

        if ($date) {
            $dayStart = clone($date);
            $mongoDateStart = new \MongoDate($dayStart->getTimestamp());
            $dayEnd = $dayStart->add(new \DateInterval("PT24H"));
            $mongoDateEnd = new \MongoDate($dayEnd->getTimestamp());

            $query->field('pubDate')->gt($mongoDateStart)
                ->field('pubDate')->lt($mongoDateEnd);
        }

        $query->sort('pubDate', 'desc')
            ->limit($limit)
        ;

        return $query->getQuery()->execute()->toArray();
    }

    /**
     * @param null|string $category
     * @param int $offset
     * @param int $limit
     * @param null $filteredSources
     * @param null $searchTitle
     * @param int $timeStamp
     * @return array
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function findAPISorted($category = 'BiH', $offset = 0, $limit = 10, $filteredSources = null, $searchTitle = null, $timeStamp = null)
    {
        if ($limit == 0) $limit = 10;

        $query = $this->createQueryBuilder()->eagerCursor(true);

        if ($category) {
            $query->field('category.title')->equals($category);
        }

        if ($filteredSources) {
            $query->field('source.title')->notIn($filteredSources);
        }

        if ($searchTitle) {
            $query->field('title')->equals(new \MongoRegex('/.*'.$searchTitle.'.*/i'));
        }

        if ($timeStamp) {
            $fromDate = new \MongoDate($timeStamp);
            $query->field('pubDate')->gt($fromDate);
        }

        $query->sort('pubDate', 'desc')
            ->hydrate(false)
            ->skip($offset)
            ->limit($limit)
        ;

        return $query->getQuery()->execute()->toArray();
    }
}
