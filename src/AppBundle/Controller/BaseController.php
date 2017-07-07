<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BaseController extends Controller
{
    public function getNumberOfArticles() {
        return $this->get('session')->get('_article_no') ? $this->get('session')->get('_article_no') : 3;
    }

    public function getSearchQuery() {
        return $this->get('session')->get('_search') ? $this->get('session')->get('_search') : '';
    }

    public function getFilterDate() {
        return $this->get('session')->get('_date') ? $this->get('session')->get('_date') : null;
    }
}
