<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ODM\Document(
 *     collection="articles",
 *     repositoryClass="AppBundle\Repository\ArticleRepository",
 * )
 * @ODM\UniqueIndex(keys={"pubDate"="desc", "title"="asc"})
 */
class Article {

    /**
     * @ODM\Id
     * @JMS\Type("integer")
     */
    private $id;

    /**
     * @ODM\EmbedOne(targetDocument="Source")
     * @JMS\Type("AppBundle\Document\Source")
     */
    private $source;

    /**
     * @ODM\EmbedOne(targetDocument="Sentiment")
     * @JMS\Type("AppBundle\Document\Sentiment")
     */
    private $sentiment;

    /**
     * @ODM\Field(type="string", name="title")
     * @JMS\Type("string")
     */
    public $title; 

    /**
     * @ODM\Field(type="string", name="link")
     * @JMS\Type("string")
     */
    public $link;

    /**
     * @ODM\Field(type="string", name="description")
     * @JMS\Type("string")
     */
    public $description;

    /**
     * @ODM\Field(type="date", name="pubDate")
     * @JMS\Type("DateTime<'D M d H:i:s O Y'>")
     */
    public $pubDate;

    /**
     * @ODM\Field(type="string", name="image")
     * @JMS\Type("string")
     */
    public $image;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * @param mixed $source
     */
    public function setSource($source)
    {
        $this->source = $source;
    }

    /**
     * @return mixed
     */
    public function getSentiment()
    {
        return $this->sentiment;
    }

    /**
     * @param mixed $sentiment
     */
    public function setSentiment($sentiment)
    {
        $this->sentiment = $sentiment;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * @param mixed $link
     */
    public function setLink($link)
    {
        $this->link = $link;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getPubDate()
    {
        return $this->pubDate;
    }

    /**
     * @param mixed $pubDate
     */
    public function setPubDate($pubDate)
    {
        $this->pubDate = $pubDate;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param mixed $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }
}
